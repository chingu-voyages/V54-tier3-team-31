'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import React, { useEffect, useState, createContext, useContext } from 'react'
// Corrected path for localforage functions
import { getAllPLanTasksFromLocal, getAllGoalsFromLocal, clearLocalData } from '@/lib/localforage'
// Corrected path for migration server action
import { migrateLocalDataToDb } from '@/app/(protected)/app/actions/migration'
import { toast } from 'sonner'

// Context to signal when migration is complete (optional, but can be useful)
const MigrationContext = createContext({ migrationComplete: false });
export const useMigrationStatus = () => useContext(MigrationContext);

function AuthHandler({ children }: { children: React.ReactNode }) {
    const { status } = useSession(); // Removed unused 'session' variable
    // Use a state that persists across renders to track if migration was *attempted* in this session lifecycle
    const [migrationAttemptedThisSession, setMigrationAttemptedThisSession] = useState(false);
    // State to signal completion for context provider
    const [migrationComplete, setMigrationComplete] = useState(false);

    useEffect(() => {
        const attemptMigration = async () => {
            // Only attempt migration if authenticated AND it hasn't been attempted *this session*
            if (status === 'authenticated' && !migrationAttemptedThisSession) {
                setMigrationAttemptedThisSession(true); // Mark as attempted immediately for this session
                console.log("Authenticated, checking for local data to migrate...");
                try {
                    // Check if local data exists
                    const localTasks = await getAllPLanTasksFromLocal();
                    const localGoals = await getAllGoalsFromLocal();

                    if (localTasks.length > 0 || localGoals.length > 0) {
                        console.log(`Found ${localTasks.length} local plan tasks and ${localGoals.length} local goals. Starting migration...`);
                        toast.info("Syncing your local data to your account...");

                        await migrateLocalDataToDb({ tasks: localTasks, goals: localGoals });
                        await clearLocalData(); // Clear local data AFTER successful migration

                        console.log("Migration successful and local data cleared.");
                        toast.success("Local data synced successfully!");
                        setMigrationComplete(true); // Signal completion

                        // Force a refresh of data hooks by reloading the page (simplest approach)
                        // Consider more granular state updates if page reload is undesirable
                        window.location.reload();

                    } else {
                        console.log("No local data found to migrate.");
                        setMigrationComplete(true); // No data to migrate, so consider it "complete"
                    }
                } catch (error) {
                    console.error("Migration failed:", error);
                    toast.error(`Failed to sync local data: ${error instanceof Error ? error.message : String(error)}. Please try logging out and back in.`);
                    // Don't clear local data on failure
                    // Don't set migrationComplete to true on failure
                }
            } else if (status === 'unauthenticated') {
                 // Reset migration attempt flag if user logs out, allowing re-attempt on next login
                 setMigrationAttemptedThisSession(false);
                 setMigrationComplete(false); // Reset completion status
            } else if (status === 'loading') {
                // Reset completion status while loading
                setMigrationComplete(false);
            }
        };

        attemptMigration();
        // Depend on status to re-run when auth state changes.
        // migrationAttemptedThisSession prevents re-running if status flaps but stays authenticated.
    }, [status, migrationAttemptedThisSession]);

    // Provide migration status to children if needed
    return (
        <MigrationContext.Provider value={{ migrationComplete }}>
            {children}
        </MigrationContext.Provider>
    );
}

// Renamed AppProviders to AuthProviderWrapper to be more specific
export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AuthHandler>
                {/* You might have other providers wrapping children here */}
                {children}
            </AuthHandler>
        </SessionProvider>
    );
}

// Ensure clearLocalData is correctly implemented in localforage.ts
// Example:
// export async function clearLocalData() {
//     ensureLocalForageConfigured();
//     if (typeof window === 'undefined') return;
//     try {
//         await localforage.removeItem(PLANS_KEY); // Use the constant key
//         await localforage.removeItem(GOALS_KEY); // Use the constant key
//         console.log("LocalForage data cleared.");
//     } catch (err) {
//         console.error('Error clearing localForage data:', err);
//     }
// }
