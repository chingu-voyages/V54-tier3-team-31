
> goalflow@0.1.0 test /Users/jerichowenzel/Desktop/V54-tier3-team-31
> vitest


 DEV  v3.0.9 /Users/jerichowenzel/Desktop/V54-tier3-team-31

stdout | tests/components/focus/focus.test.tsx > Focus Component > renders without crashing
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > renders without crashing
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders loading state initially
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders title and sections
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > fetches and displays data for anonymous user (localForage)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is unauthenticated
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is unauthenticated
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is authenticated
Before render - authenticated test
Rendering Focus component - authenticated test

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is authenticated
Calling cleanupOldFocusTasksDb for authenticated user
cleanupOldFocusTasksDb called - authenticated test

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is authenticated
Calling getFocusTasksForUser for authenticated user

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is authenticated
Advancing timers - authenticated test

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is authenticated
Waiting for cleanupOldFocusTasksDb - authenticated test

stdout | tests/components/focus/focus.cleanup.test.tsx > Focus Component Cleanup Tests > calls cleanup function when user is authenticated
Waiting for getFocusTasksForUser - authenticated test

stdout | tests/components/focus/focus.test.tsx > Focus Component > shows dropdown menu with correct actions
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > shows dropdown menu with correct actions
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > displays empty state message when no tasks
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > displays empty state message when no tasks
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > displays best time information for goals
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > displays best time information for goals
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > displays tasks with their correct information
Calling cleanupOldFocusTasks for unauthenticated user

 ✓ tests/components/focus/focus.cleanup.test.tsx (2 tests) 94ms
stdout | tests/components/focus/focus.test.tsx > Focus Component > displays tasks with their correct information
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles adding a new goal
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles adding a new goal
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles showing and hiding task form
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles showing and hiding task form
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task completion
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task completion
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task frequency change
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task frequency change
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task duration change
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task duration change
Calling getTasksInFocus for unauthenticated user

 ✓ tests/components/plans/plans.test.tsx (9 tests) 337ms
stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task deletion
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > handles task deletion
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > calls cleanup and handles old focus tasks (unauthenticated)
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > calls cleanup and handles old focus tasks (unauthenticated)
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > calls cleanup and handles old focus tasks (unauthenticated)
Calling cleanupOldFocusTasks for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > calls cleanup and handles old focus tasks (unauthenticated)
Calling getTasksInFocus for unauthenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > calls cleanup and handles old focus tasks (authenticated)
Calling cleanupOldFocusTasksDb for authenticated user

stdout | tests/components/focus/focus.test.tsx > Focus Component > calls cleanup and handles old focus tasks (authenticated)
Calling getFocusTasksForUser for authenticated user

 ✓ tests/components/focus/focus.test.tsx (13 tests) 541ms
stdout | tests/components/progress/progress.test.tsx > Progress Component > switches between weekly and monthly tabs
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > navigates heatmap (previous/next)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

 ✓ tests/ui/button.test.tsx (9 tests) 135ms
stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > displays "No habit completions found" when habits array is empty
Fetched localGoals: []
Fetched localPlanTasks: []

 ❯ tests/components/progress/progress.test.tsx (9 tests | 2 failed) 2501ms
   ✓ Progress Component > renders loading state initially
   ✓ Progress Component > renders title and sections
   × Progress Component > fetches and displays data for anonymous user (localForage) 1044ms
     → expected "getAllGoalsFromLocal" to be called 1 times, but got 2 times

Ignored nodes: comments, script, style
[36m<html>[39m
  [36m<head />[39m
  [36m<body>[39m
    [36m<div>[39m
      [36m<div[39m
        [33mclass[39m=[32m"min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8 "[39m
      [36m>[39m
        [36m<div[39m
          [33mclass[39m=[32m"items-center mb-6 px-4"[39m
        [36m>[39m
          [36m<h1[39m
            [33mclass[39m=[32m"text-3xl font-semibold"[39m
          [36m>[39m
            [0mMy Progress[0m
          [36m</h1>[39m
        [36m</div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"items-center mb-4 px-4"[39m
        [36m>[39m
          [36m<h2[39m
            [33mclass[39m=[32m"text-xl font-semibold"[39m
          [36m>[39m
            [0mProductivity Trend[0m
          [36m</h2>[39m
          [36m<div[39m
            [33mclass[39m=[32m"flex flex-col gap-4 w-full mt-4"[39m
            [33mdata-orientation[39m=[32m"horizontal"[39m
            [33mdata-slot[39m=[32m"tabs"[39m
            [33mdir[39m=[32m"ltr"[39m
          [36m>[39m
            [36m<div[39m
              [33maria-orientation[39m=[32m"horizontal"[39m
              [33mclass[39m=[32m"bg-neutral-700 text-muted-foreground items-center justify-center rounded-md p-[5px] flex w-[161px] h-[42px]"[39m
              [33mdata-orientation[39m=[32m"horizontal"[39m
              [33mdata-slot[39m=[32m"tabs-list"[39m
              [33mrole[39m=[32m"tablist"[39m
              [33mstyle[39m=[32m"outline: none;"[39m
              [33mtabindex[39m=[32m"0"[39m
            [36m>[39m
              [36m<button[39m
                [33maria-controls[39m=[32m"radix-:r6:-content-weekly"[39m
                [33maria-selected[39m=[32m"true"[39m
                [33mclass[39m=[32m"data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-neutral-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-neutral-400 gap-1.5 rounded-sm border border-transparent text-sm font-normal whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 flex-1 w-[73px] h-[32px] flex items-center justify-center"[39m
                [33mdata-orientation[39m=[32m"horizontal"[39m
                [33mdata-radix-collection-item[39m=[32m""[39m
                [33mdata-slot[39m=[32m"tabs-trigger"[39m
                [33mdata-state[39m=[32m"active"[39m
                [33mid[39m=[32m"radix-:r6:-trigger-weekly"[39m
                [33mrole[39m=[32m"tab"[39m
                [33mtabindex[39m=[32m"-1"[39m
                [33mtype[39m=[32m"button"[39m
              [36m>[39m
                [0mWeekly[0m
              [36m</button>[39m
              [36m<button[39m
                [33maria-controls[39m=[32m"radix-:r6:-content-monthly"[39m
                [33maria-selected[39m=[32m"false"[39m
                [33mclass[39m=[32m"data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-neutral-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-neutral-400 gap-1.5 rounded-sm border border-transparent text-sm font-normal whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 flex-1 w-[73px] h-[32px] flex items-center justify-center"[39m
                [33mdata-orientation[39m=[32m"horizontal"[39m
                [33mdata-radix-collection-item[39m=[32m""[39m
                [33mdata-slot[39m=[32m"tabs-trigger"[39m
                [33mdata-state[39m=[32m"inactive"[39m
                [33mid[39m=[32m"radix-:r6:-trigger-monthly"[39m
                [33mrole[39m=[32m"tab"[39m
                [33mtabindex[39m=[32m"-1"[39m
                [33mtype[39m=[32m"button"[39m
              [36m>[39m
                [0mMonthly[0m
              [36m</button>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex flex-col items-center justify-center neutral-700 rounded-[6px] border"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"flex items-center justify-center mb-2.5 mt-6"[39m
              [36m>[39m
                [36m<button[39m
                  [33mclass[39m=[32m"w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-chevron-left"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"16"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"16"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"m15 18-6-6 6-6"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</button>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"mx-4 flex flex-col justify-center items-center"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"w-[200px] px-1"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mdata-testid[39m=[32m"tooltip"[39m
                    [36m>[39m
                      [0mTooltip[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33maria-labelledby[39m=[32m"radix-:r6:-trigger-weekly"[39m
                      [33mclass[39m=[32m"flex-1 outline-none"[39m
                      [33mdata-orientation[39m=[32m"horizontal"[39m
                      [33mdata-slot[39m=[32m"tabs-content"[39m
                      [33mdata-state[39m=[32m"active"[39m
                      [33mid[39m=[32m"radix-:r6:-content-weekly"[39m
                      [33mrole[39m=[32m"tabpanel"[39m
                      [33mstyle[39m=[32m"animation-duration: 0s;"[39m
                      [33mtabindex[39m=[32m"0"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mdata-testid[39m=[32m"calendar-heatmap"[39m
                      [36m>[39m
                        [0mHeatmap from [0m
                        [0m2025-04-12T00:00:00.000Z[0m
                        [0m to [0m
                        [0m2025-04-18T23:59:59.999Z[0m
                        [0m with [0m
                        [0m3[0m
                        [0m values[0m
                      [36m</div>[39m
                    [36m</div>[39m
                    [36m<div[39m
                      [33maria-labelledby[39m=[32m"radix-:r6:-trigger-monthly"[39m
                      [33mclass[39m=[32m"flex-1 outline-none"[39m
                      [33mdata-orientation[39m=[32m"horizontal"[39m
                      [33mdata-slot[39m=[32m"tabs-content"[39m
                      [33mdata-state[39m=[32m"inactive"[39m
                      [33mhidden[39m=[32m""[39m
                      [33mid[39m=[32m"radix-:r6:-content-monthly"[39m
                      [33mrole[39m=[32m"tabpanel"[39m
                      [33mtabindex[39m=[32m"0"[39m
                    [36m/>[39m
                  [36m</div>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"grid grid-cols-7 text-center text-xs font-medium text-neutral-400 mt-1.5 w-[200px] h-[20px]"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mS[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mM[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mT[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mW[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mT[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mF[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mS[0m
                    [36m</div>[39m
                  [36m</div>[39m
                [36m</div>[39m
                [36m<button[39m
                  [33mclass[39m=[32m"w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"[39m
                  [33mdisabled[39m=[32m""[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-chevron-right"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"16"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"16"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"m9 18 6-6-6-6"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</button>[39m
              [36m</div>[39m
              [36m<div[39m
                [33mclass[39m=[32m"flex items-center justify-center mt-2"[39m
              [36m>[39m
                [36m<p[39m
                  [33mclass[39m=[32m"text-sm font-medium text-neutral-50"[39m
                [36m>[39m
                  [0mApril 12 - April 19[0m
                [36m</p>[39m
              [36m</div>[39m
              [36m<div[39m
                [33mclass[39m=[32m"flex gap-2 justify-center items-center bg-neutral-800 px-4 py-2.5 rounded-full text-xs text-neutral-400 mt-2.5 mb-6"[39m
              [36m>[39m
                [36m<p>[39m
                  [0mLow[0m
                [36m</p>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#f7fee7] rounded-xs"[39m
                [36m/>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#365314] rounded-xs"[39m
                [36m/>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#65a30d] rounded-xs"[39m
                [36m/>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#d9f99d] rounded-xs"[39m
                [36m/>[39m
                [36m<p>[39m
                  [0mHigh[0m
                [36m</p>[39m
              [36m</div>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"items-center mb-4 px-4"[39m
        [36m>[39m
          [36m<h2[39m
            [33mclass[39m=[32m"text-xl font-semibold"[39m
          [36m>[39m
            [0mCompletion List[0m
          [36m</h2>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"completion-card-Goal 1"[39m
          [36m>[39m
            [0mGoal 1[0m
            [0m - [0m
            [0m1[0m
            [0m completions[0m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"completion-card-Goal 2"[39m
          [36m>[39m
            [0mGoal 2[0m
            [0m - [0m
            [0m1[0m
            [0m completions[0m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"completion-card-General Plan Tasks"[39m
          [36m>[39m
            [0mGeneral Plan Tasks[0m
            [0m - [0m
            [0m1[0m
            [0m completions[0m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</div>[39m
  [36m</body>[39m
[36m</html>[39m
   ✓ Progress Component > fetches and displays data for logged-in user (API)
   ✓ Progress Component > switches between weekly and monthly tabs
   ✓ Progress Component > navigates heatmap (previous/next)
   × Progress Component > selects a habit and shows HabitCompletions, then goes back 1022ms
     → Unable to find an element by: [data-testid="habit-completions-title"]

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div>[39m
    [36m<div[39m
      [33mclass[39m=[32m"min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8"[39m
    [36m>[39m
      [36m<button[39m
        [33mclass[39m=[32m"justify-start hover:no-underline px-0 hover:cursor-pointer gap-5 mb-2"[39m
        [33mvariant[39m=[32m"link"[39m
      [36m>[39m
        [36m<svg[39m
          [33mclass[39m=[32m"lucide lucide-arrow-left !w-6 !h-6"[39m
          [33mfill[39m=[32m"none"[39m
          [33mheight[39m=[32m"24"[39m
          [33mstroke[39m=[32m"currentColor"[39m
          [33mstroke-linecap[39m=[32m"round"[39m
          [33mstroke-linejoin[39m=[32m"round"[39m
          [33mstroke-width[39m=[32m"2"[39m
          [33mviewBox[39m=[32m"0 0 24 24"[39m
          [33mwidth[39m=[32m"24"[39m
          [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
        [36m>[39m
          [36m<path[39m
            [33md[39m=[32m"m12 19-7-7 7-7"[39m
          [36m/>[39m
          [36m<path[39m
            [33md[39m=[32m"M19 12H5"[39m
          [36m/>[39m
        [36m</svg>[39m
        [36m<h3[39m
          [33mclass[39m=[32m"text-2xl font-semibold"[39m
        [36m>[39m
          [0mHabit completions[0m
        [36m</h3>[39m
      [36m</button>[39m
      [36m<h4[39m
        [33mclass[39m=[32m"mt-4 text-xl font-semibold"[39m
      [36m>[39m
        [0mGoal 1[0m
      [36m</h4>[39m
      [36m<div[39m
        [33mclass[39m=[32m"mt-4 w-full space-y-4"[39m
      [36m>[39m
        [36m<div[39m
          [33mclass[39m=[32m"text-card-foreground flex flex-col gap-2.5 py-6 shadow-sm border-b-[1px] rounded-none mb-2 bg-neutral-900 min-h-[72px] pt-0 pb-3"[39m
          [33mdata-slot[39m=[32m"card"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"w-full"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center gap-1.5 text-base text-foreground font-medium"[39m
            [36m>[39m
              [36m<button[39m
                [33maria-checked[39m=[32m"true"[39m
                [33mclass[39m=[32m"peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5 rounded-full hover:cursor-pointer false data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900"[39m
                [33mdata-slot[39m=[32m"checkbox"[39m
                [33mdata-state[39m=[32m"checked"[39m
                [33mrole[39m=[32m"checkbox"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvalue[39m=[32m"on"[39m
              [36m>[39m
                [36m<span[39m
                  [33mclass[39m=[32m"flex items-center justify-center text-current transition-none"[39m
                  [33mdata-slot[39m=[32m"checkbox-indicator"[39m
                  [33mdata-state[39m=[32m"checked"[39m
                  [33mstyle[39m=[32m"pointer-events: none;"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-check size-3.5"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"M20 6 9 17l-5-5"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</span>[39m
              [36m</button>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch my-auto text-neutral-100 text-base font-normal line-through text-zinc-500"[39m
              [36m>[39m
                [0mTask 1.1[0m
              [36m</div>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center text-xs text-foreground font-medium justify-between mt-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-4 my-auto"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0mDaily[0m
                [36m</div>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0m15 mins[0m
                [36m</div>[39m
              [36m</div>[39m
              [36m<button[39m
                [33maria-expanded[39m=[32m"false"[39m
                [33maria-haspopup[39m=[32m"menu"[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-1 whitespace-nowrap my-auto"[39m
                [33mdata-slot[39m=[32m"dropdown-menu-trigger"[39m
                [33mdata-state[39m=[32m"closed"[39m
                [33mid[39m=[32m"radix-:rl:"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvariant[39m=[32m"ghost"[39m
              [36m>[39m
                [36m<svg[39m
                  [33mclass[39m=[32m"lucide lucide-ellipsis"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"12"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"19"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"5"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                [36m</svg>[39m
              [36m</button>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div>[39m
    [36m<div[39m
      [33mclass[39m=[32m"min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8"[39m
    [36m>[39m
      [36m<button[39m
        [33mclass[39m=[32m"justify-start hover:no-underline px-0 hover:cursor-pointer gap-5 mb-2"[39m
        [33mvariant[39m=[32m"link"[39m
      [36m>[39m
        [36m<svg[39m
          [33mclass[39m=[32m"lucide lucide-arrow-left !w-6 !h-6"[39m
          [33mfill[39m=[32m"none"[39m
          [33mheight[39m=[32m"24"[39m
          [33mstroke[39m=[32m"currentColor"[39m
          [33mstroke-linecap[39m=[32m"round"[39m
          [33mstroke-linejoin[39m=[32m"round"[39m
          [33mstroke-width[39m=[32m"2"[39m
          [33mviewBox[39m=[32m"0 0 24 24"[39m
          [33mwidth[39m=[32m"24"[39m
          [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
        [36m>[39m
          [36m<path[39m
            [33md[39m=[32m"m12 19-7-7 7-7"[39m
          [36m/>[39m
          [36m<path[39m
            [33md[39m=[32m"M19 12H5"[39m
          [36m/>[39m
        [36m</svg>[39m
        [36m<h3[39m
          [33mclass[39m=[32m"text-2xl font-semibold"[39m
        [36m>[39m
          [0mHabit completions[0m
        [36m</h3>[39m
      [36m</button>[39m
      [36m<h4[39m
        [33mclass[39m=[32m"mt-4 text-xl font-semibold"[39m
      [36m>[39m
        [0mGoal 1[0m
      [36m</h4>[39m
      [36m<div[39m
        [33mclass[39m=[32m"mt-4 w-full space-y-4"[39m
      [36m>[39m
        [36m<div[39m
          [33mclass[39m=[32m"text-card-foreground flex flex-col gap-2.5 py-6 shadow-sm border-b-[1px] rounded-none mb-2 bg-neutral-900 min-h-[72px] pt-0 pb-3"[39m
          [33mdata-slot[39m=[32m"card"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"w-full"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center gap-1.5 text-base text-foreground font-medium"[39m
            [36m>[39m
              [36m<button[39m
                [33maria-checked[39m=[32m"true"[39m
                [33mclass[39m=[32m"peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5 rounded-full hover:cursor-pointer false data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900"[39m
                [33mdata-slot[39m=[32m"checkbox"[39m
                [33mdata-state[39m=[32m"checked"[39m
                [33mrole[39m=[32m"checkbox"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvalue[39m=[32m"on"[39m
              [36m>[39m
                [36m<span[39m
                  [33mclass[39m=[32m"flex items-center justify-center text-current transition-none"[39m
                  [33mdata-slot[39m=[32m"checkbox-indicator"[39m
                  [33mdata-state[39m=[32m"checked"[39m
                  [33mstyle[39m=[32m"pointer-events: none;"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-check size-3.5"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"M20 6 9 17l-5-5"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</span>[39m
              [36m</button>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch my-auto text-neutral-100 text-base font-normal line-through text-zinc-500"[39m
              [36m>[39m
                [0mTask 1.1[0m
              [36m</div>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center text-xs text-foreground font-medium justify-between mt-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-4 my-auto"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0mDaily[0m
                [36m</div>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0m15 mins[0m
                [36m</div>[39m
              [36m</div>[39m
              [36m<button[39m
                [33maria-expanded[39m=[32m"false"[39m
                [33maria-haspopup[39m=[32m"menu"[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-1 whitespace-nowrap my-auto"[39m
                [33mdata-slot[39m=[32m"dropdown-menu-trigger"[39m
                [33mdata-state[39m=[32m"closed"[39m
                [33mid[39m=[32m"radix-:rl:"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvariant[39m=[32m"ghost"[39m
              [36m>[39m
                [36m<svg[39m
                  [33mclass[39m=[32m"lucide lucide-ellipsis"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"12"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"19"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"5"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                [36m</svg>[39m
              [36m</button>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m
   ✓ Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
   ✓ Progress Component > displays "No habit completions found" when habits array is empty

 Test Files  1 failed | 4 passed (5)
      Tests  2 failed | 40 passed (42)
   Start at  07:56:22
   Duration  4.06s (transform 465ms, setup 356ms, collect 4.75s, tests 3.61s, environment 1.45s, prepare 251ms)

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
c[3J RERUN  tests/components/progress/progress.test.tsx x1 

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders loading state initially
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders title and sections
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > fetches and displays data for anonymous user (localForage)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > switches between weekly and monthly tabs
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > navigates heatmap (previous/next)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > displays "No habit completions found" when habits array is empty
Fetched localGoals: []
Fetched localPlanTasks: []

 ❯ tests/components/progress/progress.test.tsx (9 tests | 2 failed) 2258ms
   ✓ Progress Component > renders loading state initially
   ✓ Progress Component > renders title and sections
   × Progress Component > fetches and displays data for anonymous user (localForage) 1012ms
     → expected "getAllGoalsFromLocal" to be called 1 times, but got 2 times

Ignored nodes: comments, script, style
[36m<html>[39m
  [36m<head />[39m
  [36m<body>[39m
    [36m<div>[39m
      [36m<div[39m
        [33mclass[39m=[32m"min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8 "[39m
      [36m>[39m
        [36m<div[39m
          [33mclass[39m=[32m"items-center mb-6 px-4"[39m
        [36m>[39m
          [36m<h1[39m
            [33mclass[39m=[32m"text-3xl font-semibold"[39m
          [36m>[39m
            [0mMy Progress[0m
          [36m</h1>[39m
        [36m</div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"items-center mb-4 px-4"[39m
        [36m>[39m
          [36m<h2[39m
            [33mclass[39m=[32m"text-xl font-semibold"[39m
          [36m>[39m
            [0mProductivity Trend[0m
          [36m</h2>[39m
          [36m<div[39m
            [33mclass[39m=[32m"flex flex-col gap-4 w-full mt-4"[39m
            [33mdata-orientation[39m=[32m"horizontal"[39m
            [33mdata-slot[39m=[32m"tabs"[39m
            [33mdir[39m=[32m"ltr"[39m
          [36m>[39m
            [36m<div[39m
              [33maria-orientation[39m=[32m"horizontal"[39m
              [33mclass[39m=[32m"bg-neutral-700 text-muted-foreground items-center justify-center rounded-md p-[5px] flex w-[161px] h-[42px]"[39m
              [33mdata-orientation[39m=[32m"horizontal"[39m
              [33mdata-slot[39m=[32m"tabs-list"[39m
              [33mrole[39m=[32m"tablist"[39m
              [33mstyle[39m=[32m"outline: none;"[39m
              [33mtabindex[39m=[32m"0"[39m
            [36m>[39m
              [36m<button[39m
                [33maria-controls[39m=[32m"radix-:r6:-content-weekly"[39m
                [33maria-selected[39m=[32m"true"[39m
                [33mclass[39m=[32m"data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-neutral-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-neutral-400 gap-1.5 rounded-sm border border-transparent text-sm font-normal whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 flex-1 w-[73px] h-[32px] flex items-center justify-center"[39m
                [33mdata-orientation[39m=[32m"horizontal"[39m
                [33mdata-radix-collection-item[39m=[32m""[39m
                [33mdata-slot[39m=[32m"tabs-trigger"[39m
                [33mdata-state[39m=[32m"active"[39m
                [33mid[39m=[32m"radix-:r6:-trigger-weekly"[39m
                [33mrole[39m=[32m"tab"[39m
                [33mtabindex[39m=[32m"-1"[39m
                [33mtype[39m=[32m"button"[39m
              [36m>[39m
                [0mWeekly[0m
              [36m</button>[39m
              [36m<button[39m
                [33maria-controls[39m=[32m"radix-:r6:-content-monthly"[39m
                [33maria-selected[39m=[32m"false"[39m
                [33mclass[39m=[32m"data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-neutral-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-neutral-400 gap-1.5 rounded-sm border border-transparent text-sm font-normal whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 flex-1 w-[73px] h-[32px] flex items-center justify-center"[39m
                [33mdata-orientation[39m=[32m"horizontal"[39m
                [33mdata-radix-collection-item[39m=[32m""[39m
                [33mdata-slot[39m=[32m"tabs-trigger"[39m
                [33mdata-state[39m=[32m"inactive"[39m
                [33mid[39m=[32m"radix-:r6:-trigger-monthly"[39m
                [33mrole[39m=[32m"tab"[39m
                [33mtabindex[39m=[32m"-1"[39m
                [33mtype[39m=[32m"button"[39m
              [36m>[39m
                [0mMonthly[0m
              [36m</button>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex flex-col items-center justify-center neutral-700 rounded-[6px] border"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"flex items-center justify-center mb-2.5 mt-6"[39m
              [36m>[39m
                [36m<button[39m
                  [33mclass[39m=[32m"w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-chevron-left"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"16"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"16"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"m15 18-6-6 6-6"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</button>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"mx-4 flex flex-col justify-center items-center"[39m
                [36m>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"w-[200px] px-1"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mdata-testid[39m=[32m"tooltip"[39m
                    [36m>[39m
                      [0mTooltip[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33maria-labelledby[39m=[32m"radix-:r6:-trigger-weekly"[39m
                      [33mclass[39m=[32m"flex-1 outline-none"[39m
                      [33mdata-orientation[39m=[32m"horizontal"[39m
                      [33mdata-slot[39m=[32m"tabs-content"[39m
                      [33mdata-state[39m=[32m"active"[39m
                      [33mid[39m=[32m"radix-:r6:-content-weekly"[39m
                      [33mrole[39m=[32m"tabpanel"[39m
                      [33mstyle[39m=[32m"animation-duration: 0s;"[39m
                      [33mtabindex[39m=[32m"0"[39m
                    [36m>[39m
                      [36m<div[39m
                        [33mdata-testid[39m=[32m"calendar-heatmap"[39m
                      [36m>[39m
                        [0mHeatmap from [0m
                        [0m2025-04-12T00:00:00.000Z[0m
                        [0m to [0m
                        [0m2025-04-18T23:59:59.999Z[0m
                        [0m with [0m
                        [0m3[0m
                        [0m values[0m
                      [36m</div>[39m
                    [36m</div>[39m
                    [36m<div[39m
                      [33maria-labelledby[39m=[32m"radix-:r6:-trigger-monthly"[39m
                      [33mclass[39m=[32m"flex-1 outline-none"[39m
                      [33mdata-orientation[39m=[32m"horizontal"[39m
                      [33mdata-slot[39m=[32m"tabs-content"[39m
                      [33mdata-state[39m=[32m"inactive"[39m
                      [33mhidden[39m=[32m""[39m
                      [33mid[39m=[32m"radix-:r6:-content-monthly"[39m
                      [33mrole[39m=[32m"tabpanel"[39m
                      [33mtabindex[39m=[32m"0"[39m
                    [36m/>[39m
                  [36m</div>[39m
                  [36m<div[39m
                    [33mclass[39m=[32m"grid grid-cols-7 text-center text-xs font-medium text-neutral-400 mt-1.5 w-[200px] h-[20px]"[39m
                  [36m>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mS[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mM[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mT[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mW[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mT[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mF[0m
                    [36m</div>[39m
                    [36m<div[39m
                      [33mclass[39m=[32m"flex items-center justify-center h-5"[39m
                    [36m>[39m
                      [0mS[0m
                    [36m</div>[39m
                  [36m</div>[39m
                [36m</div>[39m
                [36m<button[39m
                  [33mclass[39m=[32m"w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"[39m
                  [33mdisabled[39m=[32m""[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-chevron-right"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"16"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"16"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"m9 18 6-6-6-6"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</button>[39m
              [36m</div>[39m
              [36m<div[39m
                [33mclass[39m=[32m"flex items-center justify-center mt-2"[39m
              [36m>[39m
                [36m<p[39m
                  [33mclass[39m=[32m"text-sm font-medium text-neutral-50"[39m
                [36m>[39m
                  [0mApril 12 - April 19[0m
                [36m</p>[39m
              [36m</div>[39m
              [36m<div[39m
                [33mclass[39m=[32m"flex gap-2 justify-center items-center bg-neutral-800 px-4 py-2.5 rounded-full text-xs text-neutral-400 mt-2.5 mb-6"[39m
              [36m>[39m
                [36m<p>[39m
                  [0mLow[0m
                [36m</p>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#f7fee7] rounded-xs"[39m
                [36m/>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#365314] rounded-xs"[39m
                [36m/>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#65a30d] rounded-xs"[39m
                [36m/>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"w-[18px] h-[18px] bg-[#d9f99d] rounded-xs"[39m
                [36m/>[39m
                [36m<p>[39m
                  [0mHigh[0m
                [36m</p>[39m
              [36m</div>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
        [36m<div[39m
          [33mclass[39m=[32m"items-center mb-4 px-4"[39m
        [36m>[39m
          [36m<h2[39m
            [33mclass[39m=[32m"text-xl font-semibold"[39m
          [36m>[39m
            [0mCompletion List[0m
          [36m</h2>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"completion-card-Goal 1"[39m
          [36m>[39m
            [0mGoal 1[0m
            [0m - [0m
            [0m1[0m
            [0m completions[0m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"completion-card-Goal 2"[39m
          [36m>[39m
            [0mGoal 2[0m
            [0m - [0m
            [0m1[0m
            [0m completions[0m
          [36m</div>[39m
          [36m<div[39m
            [33mdata-testid[39m=[32m"completion-card-General Plan Tasks"[39m
          [36m>[39m
            [0mGeneral Plan Tasks[0m
            [0m - [0m
            [0m1[0m
            [0m completions[0m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</div>[39m
  [36m</body>[39m
[36m</html>[39m
   ✓ Progress Component > fetches and displays data for logged-in user (API)
   ✓ Progress Component > switches between weekly and monthly tabs
   ✓ Progress Component > navigates heatmap (previous/next)
   × Progress Component > selects a habit and shows HabitCompletions, then goes back 1016ms
     → Unable to find an element by: [data-testid="habit-completions-title"]

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div>[39m
    [36m<div[39m
      [33mclass[39m=[32m"min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8"[39m
    [36m>[39m
      [36m<button[39m
        [33mclass[39m=[32m"justify-start hover:no-underline px-0 hover:cursor-pointer gap-5 mb-2"[39m
        [33mvariant[39m=[32m"link"[39m
      [36m>[39m
        [36m<svg[39m
          [33mclass[39m=[32m"lucide lucide-arrow-left !w-6 !h-6"[39m
          [33mfill[39m=[32m"none"[39m
          [33mheight[39m=[32m"24"[39m
          [33mstroke[39m=[32m"currentColor"[39m
          [33mstroke-linecap[39m=[32m"round"[39m
          [33mstroke-linejoin[39m=[32m"round"[39m
          [33mstroke-width[39m=[32m"2"[39m
          [33mviewBox[39m=[32m"0 0 24 24"[39m
          [33mwidth[39m=[32m"24"[39m
          [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
        [36m>[39m
          [36m<path[39m
            [33md[39m=[32m"m12 19-7-7 7-7"[39m
          [36m/>[39m
          [36m<path[39m
            [33md[39m=[32m"M19 12H5"[39m
          [36m/>[39m
        [36m</svg>[39m
        [36m<h3[39m
          [33mclass[39m=[32m"text-2xl font-semibold"[39m
        [36m>[39m
          [0mHabit completions[0m
        [36m</h3>[39m
      [36m</button>[39m
      [36m<h4[39m
        [33mclass[39m=[32m"mt-4 text-xl font-semibold"[39m
      [36m>[39m
        [0mGoal 1[0m
      [36m</h4>[39m
      [36m<div[39m
        [33mclass[39m=[32m"mt-4 w-full space-y-4"[39m
      [36m>[39m
        [36m<div[39m
          [33mclass[39m=[32m"text-card-foreground flex flex-col gap-2.5 py-6 shadow-sm border-b-[1px] rounded-none mb-2 bg-neutral-900 min-h-[72px] pt-0 pb-3"[39m
          [33mdata-slot[39m=[32m"card"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"w-full"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center gap-1.5 text-base text-foreground font-medium"[39m
            [36m>[39m
              [36m<button[39m
                [33maria-checked[39m=[32m"true"[39m
                [33mclass[39m=[32m"peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5 rounded-full hover:cursor-pointer false data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900"[39m
                [33mdata-slot[39m=[32m"checkbox"[39m
                [33mdata-state[39m=[32m"checked"[39m
                [33mrole[39m=[32m"checkbox"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvalue[39m=[32m"on"[39m
              [36m>[39m
                [36m<span[39m
                  [33mclass[39m=[32m"flex items-center justify-center text-current transition-none"[39m
                  [33mdata-slot[39m=[32m"checkbox-indicator"[39m
                  [33mdata-state[39m=[32m"checked"[39m
                  [33mstyle[39m=[32m"pointer-events: none;"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-check size-3.5"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"M20 6 9 17l-5-5"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</span>[39m
              [36m</button>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch my-auto text-neutral-100 text-base font-normal line-through text-zinc-500"[39m
              [36m>[39m
                [0mTask 1.1[0m
              [36m</div>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center text-xs text-foreground font-medium justify-between mt-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-4 my-auto"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0mDaily[0m
                [36m</div>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0m15 mins[0m
                [36m</div>[39m
              [36m</div>[39m
              [36m<button[39m
                [33maria-expanded[39m=[32m"false"[39m
                [33maria-haspopup[39m=[32m"menu"[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-1 whitespace-nowrap my-auto"[39m
                [33mdata-slot[39m=[32m"dropdown-menu-trigger"[39m
                [33mdata-state[39m=[32m"closed"[39m
                [33mid[39m=[32m"radix-:rl:"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvariant[39m=[32m"ghost"[39m
              [36m>[39m
                [36m<svg[39m
                  [33mclass[39m=[32m"lucide lucide-ellipsis"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"12"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"19"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"5"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                [36m</svg>[39m
              [36m</button>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div>[39m
    [36m<div[39m
      [33mclass[39m=[32m"min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8"[39m
    [36m>[39m
      [36m<button[39m
        [33mclass[39m=[32m"justify-start hover:no-underline px-0 hover:cursor-pointer gap-5 mb-2"[39m
        [33mvariant[39m=[32m"link"[39m
      [36m>[39m
        [36m<svg[39m
          [33mclass[39m=[32m"lucide lucide-arrow-left !w-6 !h-6"[39m
          [33mfill[39m=[32m"none"[39m
          [33mheight[39m=[32m"24"[39m
          [33mstroke[39m=[32m"currentColor"[39m
          [33mstroke-linecap[39m=[32m"round"[39m
          [33mstroke-linejoin[39m=[32m"round"[39m
          [33mstroke-width[39m=[32m"2"[39m
          [33mviewBox[39m=[32m"0 0 24 24"[39m
          [33mwidth[39m=[32m"24"[39m
          [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
        [36m>[39m
          [36m<path[39m
            [33md[39m=[32m"m12 19-7-7 7-7"[39m
          [36m/>[39m
          [36m<path[39m
            [33md[39m=[32m"M19 12H5"[39m
          [36m/>[39m
        [36m</svg>[39m
        [36m<h3[39m
          [33mclass[39m=[32m"text-2xl font-semibold"[39m
        [36m>[39m
          [0mHabit completions[0m
        [36m</h3>[39m
      [36m</button>[39m
      [36m<h4[39m
        [33mclass[39m=[32m"mt-4 text-xl font-semibold"[39m
      [36m>[39m
        [0mGoal 1[0m
      [36m</h4>[39m
      [36m<div[39m
        [33mclass[39m=[32m"mt-4 w-full space-y-4"[39m
      [36m>[39m
        [36m<div[39m
          [33mclass[39m=[32m"text-card-foreground flex flex-col gap-2.5 py-6 shadow-sm border-b-[1px] rounded-none mb-2 bg-neutral-900 min-h-[72px] pt-0 pb-3"[39m
          [33mdata-slot[39m=[32m"card"[39m
        [36m>[39m
          [36m<div[39m
            [33mclass[39m=[32m"w-full"[39m
          [36m>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center gap-1.5 text-base text-foreground font-medium"[39m
            [36m>[39m
              [36m<button[39m
                [33maria-checked[39m=[32m"true"[39m
                [33mclass[39m=[32m"peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5 rounded-full hover:cursor-pointer false data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900"[39m
                [33mdata-slot[39m=[32m"checkbox"[39m
                [33mdata-state[39m=[32m"checked"[39m
                [33mrole[39m=[32m"checkbox"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvalue[39m=[32m"on"[39m
              [36m>[39m
                [36m<span[39m
                  [33mclass[39m=[32m"flex items-center justify-center text-current transition-none"[39m
                  [33mdata-slot[39m=[32m"checkbox-indicator"[39m
                  [33mdata-state[39m=[32m"checked"[39m
                  [33mstyle[39m=[32m"pointer-events: none;"[39m
                [36m>[39m
                  [36m<svg[39m
                    [33mclass[39m=[32m"lucide lucide-check size-3.5"[39m
                    [33mfill[39m=[32m"none"[39m
                    [33mheight[39m=[32m"24"[39m
                    [33mstroke[39m=[32m"currentColor"[39m
                    [33mstroke-linecap[39m=[32m"round"[39m
                    [33mstroke-linejoin[39m=[32m"round"[39m
                    [33mstroke-width[39m=[32m"2"[39m
                    [33mviewBox[39m=[32m"0 0 24 24"[39m
                    [33mwidth[39m=[32m"24"[39m
                    [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                  [36m>[39m
                    [36m<path[39m
                      [33md[39m=[32m"M20 6 9 17l-5-5"[39m
                    [36m/>[39m
                  [36m</svg>[39m
                [36m</span>[39m
              [36m</button>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch my-auto text-neutral-100 text-base font-normal line-through text-zinc-500"[39m
              [36m>[39m
                [0mTask 1.1[0m
              [36m</div>[39m
            [36m</div>[39m
            [36m<div[39m
              [33mclass[39m=[32m"flex w-full items-center text-xs text-foreground font-medium justify-between mt-3"[39m
            [36m>[39m
              [36m<div[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-4 my-auto"[39m
              [36m>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0mDaily[0m
                [36m</div>[39m
                [36m<div[39m
                  [33mclass[39m=[32m"self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid"[39m
                [36m>[39m
                  [0m15 mins[0m
                [36m</div>[39m
              [36m</div>[39m
              [36m<button[39m
                [33maria-expanded[39m=[32m"false"[39m
                [33maria-haspopup[39m=[32m"menu"[39m
                [33mclass[39m=[32m"self-stretch flex items-center gap-1 whitespace-nowrap my-auto"[39m
                [33mdata-slot[39m=[32m"dropdown-menu-trigger"[39m
                [33mdata-state[39m=[32m"closed"[39m
                [33mid[39m=[32m"radix-:rl:"[39m
                [33mtype[39m=[32m"button"[39m
                [33mvariant[39m=[32m"ghost"[39m
              [36m>[39m
                [36m<svg[39m
                  [33mclass[39m=[32m"lucide lucide-ellipsis"[39m
                  [33mfill[39m=[32m"none"[39m
                  [33mheight[39m=[32m"24"[39m
                  [33mstroke[39m=[32m"currentColor"[39m
                  [33mstroke-linecap[39m=[32m"round"[39m
                  [33mstroke-linejoin[39m=[32m"round"[39m
                  [33mstroke-width[39m=[32m"2"[39m
                  [33mviewBox[39m=[32m"0 0 24 24"[39m
                  [33mwidth[39m=[32m"24"[39m
                  [33mxmlns[39m=[32m"http://www.w3.org/2000/svg"[39m
                [36m>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"12"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"19"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                  [36m<circle[39m
                    [33mcx[39m=[32m"5"[39m
                    [33mcy[39m=[32m"12"[39m
                    [33mr[39m=[32m"1"[39m
                  [36m/>[39m
                [36m</svg>[39m
              [36m</button>[39m
            [36m</div>[39m
          [36m</div>[39m
        [36m</div>[39m
      [36m</div>[39m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m
   ✓ Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
   ✓ Progress Component > displays "No habit completions found" when habits array is empty

 Test Files  1 failed (1)
      Tests  2 failed | 7 passed (9)
   Start at  07:56:26
   Duration  3.03s

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
c[3J RERUN  tests/components/progress/progress.test.tsx x2 

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders loading state initially
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders title and sections
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > fetches and displays data for anonymous user (localForage)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > switches between weekly and monthly tabs
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > navigates heatmap (previous/next)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > displays "No habit completions found" when habits array is empty
Fetched localGoals: []
Fetched localPlanTasks: []

 ✓ tests/components/progress/progress.test.tsx (9 tests) 600ms

 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  07:57:33
   Duration  1.08s

 PASS  Waiting for file changes...
       press h to show help, press q to quit
c[3J RERUN  tests/components/progress/progress.test.tsx x3 

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders loading state initially
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > renders title and sections
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > fetches and displays data for anonymous user (localForage)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > switches between weekly and monthly tabs
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > navigates heatmap (previous/next)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > selects a habit and shows HabitCompletions, then goes back
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
Fetched localGoals: [
  {
    "id": 1,
    "name": "Goal 1",
    "description": "Goal 1 description",
    "bestTimeTitle": "Morning",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Daily",
    "userId": "test-user",
    "tasks": [
      {
        "id": 101,
        "title": "Task 1.1",
        "completed": true,
        "completedAt": "2025-04-10T00:00:00.000Z",
        "difficulty": null,
        "goalId": 1,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  },
  {
    "id": 2,
    "name": "Goal 2",
    "description": "Goal 2 description",
    "bestTimeTitle": "Evening",
    "bestTimeDescription": "Best time description",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "startDate": "2025-04-01T00:00:00.000Z",
    "endDate": "2025-04-30T00:00:00.000Z",
    "frequency": "Weekly",
    "userId": "test-user",
    "tasks": [
      {
        "id": 102,
        "title": "Task 2.1",
        "completed": true,
        "completedAt": "2025-04-11T00:00:00.000Z",
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      },
      {
        "id": 103,
        "title": "Task 2.2",
        "completed": false,
        "completedAt": null,
        "difficulty": null,
        "goalId": 2,
        "userId": "test-user",
        "frequency": "Daily",
        "duration": "15 mins",
        "createdAt": "2025-04-13T10:00:00.000Z",
        "updatedAt": "2025-04-13T10:00:00.000Z",
        "description": null,
        "isInFocus": false
      }
    ]
  }
]
Fetched localPlanTasks: [
  {
    "id": 201,
    "title": "Plan Task 1",
    "frequency": "Daily",
    "duration": "15 mins",
    "completed": true,
    "completedAt": "2025-04-12T00:00:00.000Z",
    "goalId": null,
    "userId": "test-user",
    "createdAt": "2025-04-13T10:00:00.000Z",
    "updatedAt": "2025-04-13T10:00:00.000Z",
    "difficulty": null,
    "description": null,
    "isInFocus": false
  }
]

stdout | tests/components/progress/progress.test.tsx > Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
habit for completion:  {
  id: [32m'goal-1'[39m,
  title: [32m'Goal 1'[39m,
  count: [33m1[39m,
  completions: [
    {
      id: [33m101[39m,
      name: [32m'Task 1.1'[39m,
      goalId: [33m1[39m,
      frequency: [32m'Daily'[39m,
      duration: [32m'15 mins'[39m,
      completed: [33mtrue[39m,
      completedAt: [35mMockDate 2025-04-10T00:00:00.000Z[39m
    }
  ]
}

stdout | tests/components/progress/progress.test.tsx > Progress Component > displays "No habit completions found" when habits array is empty
Fetched localGoals: []
Fetched localPlanTasks: []

 ❯ tests/components/progress/progress.test.tsx (9 tests | 1 failed) 1477ms
   ✓ Progress Component > renders loading state initially
   ✓ Progress Component > renders title and sections
   ✓ Progress Component > fetches and displays data for anonymous user (localForage)
   ✓ Progress Component > fetches and displays data for logged-in user (API)
   ✓ Progress Component > switches between weekly and monthly tabs
   ✓ Progress Component > navigates heatmap (previous/next)
   × Progress Component > selects a habit and shows HabitCompletions, then goes back 1030ms
     → Unable to find role="heading" and name `/Goal 1/i`

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div>[39m
    [36m<div>[39m
      [36m<h2[39m
        [33mdata-testid[39m=[32m"habit-completions-title"[39m
      [36m>[39m
        [0mGoal 1[0m
      [36m</h2>[39m
      [36m<button[39m
        [33mdata-testid[39m=[32m"back-button"[39m
      [36m>[39m
        [0mBack[0m
      [36m</button>[39m
      [36m<button[39m
        [33mdata-testid[39m=[32m"task-changed-button"[39m
      [36m>[39m
        [0mTask Changed[0m
      [36m</button>[39m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div>[39m
    [36m<div>[39m
      [36m<h2[39m
        [33mdata-testid[39m=[32m"habit-completions-title"[39m
      [36m>[39m
        [0mGoal 1[0m
      [36m</h2>[39m
      [36m<button[39m
        [33mdata-testid[39m=[32m"back-button"[39m
      [36m>[39m
        [0mBack[0m
      [36m</button>[39m
      [36m<button[39m
        [33mdata-testid[39m=[32m"task-changed-button"[39m
      [36m>[39m
        [0mTask Changed[0m
      [36m</button>[39m
    [36m</div>[39m
  [36m</div>[39m
[36m</body>[39m
   ✓ Progress Component > refetches data when handleTaskChanged is called (simulated via HabitCompletions)
   ✓ Progress Component > displays "No habit completions found" when habits array is empty

 Test Files  1 failed (1)
      Tests  1 failed | 8 passed (9)
   Start at  07:58:11
   Duration  1.99s

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
Cancelling test run. Press CTRL+c again to exit forcefully.

 ELIFECYCLE  Test failed. See above for more details.
