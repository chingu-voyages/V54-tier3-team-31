import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import DesktopNav from '@/components/navigation/desktop-nav'
import NavigationMenu from '@/components/navigation/navigation-menu'
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'GoalFlow',
    description: 'Let your goals flow',
}

import { AuthProviderWrapper } from '@/components/providers/auth-provider'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProviderWrapper>
                        {/* Desktop Navigation */}
                        <DesktopNav />
                        {children}
                        {/* Mobile Navigation Bar - Hidden on desktop */}
                        <div className="md:hidden">
                            <NavigationMenu />
                        </div>
                    </AuthProviderWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}
