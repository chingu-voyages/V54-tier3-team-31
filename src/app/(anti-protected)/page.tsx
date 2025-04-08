"use client";

import { useState } from "react";
import MyGoalPage from "../../components/mygoal/my-goal";
import SignIn from '@/components/login/GoogleSignin'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [showMyGoal, setShowMyGoal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {!showMyGoal ? (
        <div className="flex flex-col items-center space-y-6 max-w-md 2xl:max-w-xl w-full text-center">
          {/* Logo */}
          <div className="mb-4">
            <h1 className="text-4xl font-bold flex items-center">
              <span className="inline-block mr-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="currentColor"
                  />
                </svg>
              </span>
              GoalFlow
            </h1>
          </div>

          {/* Taglines */}
          <div className="space-y-2 mb-8">
            <h2 className="text-xl 2xl:text-2xl font-medium mt-6">
              Break down your goals with AI,
              <br />
              celebrate even the smallest wins!
            </h2>
            <p className="text-lime-400 text-sm 2xl:text-lg mt-6">
              Stay motivated, Keep progressing
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4 w-full mt-32">
            <Button
              onClick={() => setShowMyGoal(true)}
              className="w-full py-6 text-black bg-white hover:bg-gray-200 rounded-md"
            >
              Try it out first
            </Button>

            <SignIn />
          </div>
        </div>
      ) : (
        <MyGoalPage />
      )}
    </div>
  );
}
