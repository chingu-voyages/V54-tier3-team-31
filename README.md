<div align="left">
    <div style="display: inline-block;">
        <h2 style="display: inline-block; vertical-align: middle; margin-top: 0;">GoalFlow</h2>
        <br>
	<img src="https://img.shields.io/github/last-commit/chingu-voyages/V54-tier3-team-31?style=default&logo=git&logoColor=white&color=474747" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/chingu-voyages/V54-tier3-team-31?style=default&color=474747" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/chingu-voyages/V54-tier3-team-31?style=default&color=474747" alt="repo-language-count">
    </div>
</div>
<br clear="left"/>

##  Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
	- [Project Index](#project-index)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Database Config](#database-config)
- [Icon Config](#icon-config)
- [Project Roadmap](#project-roadmap)
- [Figures](#figures)
	- [User FLow (Prototype)](#user-flow-prototype)
	- [Software Architecure](#software-architecure)
	- [ERD](#erd)
	- [Component Tree](#component-tree)
		- [Plans Component](#plans-component)
		- [Focus Component](#focus-component)
		- [Progress Component](#progress-component)
		- [Account Component](#account-component)
- [Our Team](#our-team)
- [Contributor Graph](#contributor-graph)

---

##  Overview

GoalFlow helps users set and achieve their goals by leveraging AI to break down tasks into smaller, actionable steps. It simplifies the process, making it easier to take action even during low-motivation periods. Users gain a sense of accomplishment and control, encouraging continuous progress toward their ideal life.

---

##  Features

- AI Generated & Customizable Goals 
- Task Customization
- Progress Analytics & Reports

---

##  Getting Started

###  Prerequisites

Before getting started with V54-tier3-team-31, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

---

## Setup

> Note: Navigate to the project directory before running these commands.

1. Install the project's dependencies using pnpm:

    ```shell
    pnpm i
    ```

2. Run the project in development mode:

   ```shell
   pnpm dev
   ```

## Database Config

> Create a new neon project

![Neon project](https://github.com/user-attachments/assets/62857967-c736-467b-bab1-7f1f87170c8b "neon projecT")

1. Get your database url it would look something like this:

> postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname?sslmode=require

2. Then paste it in `.env`, run this to generate a migrations 

```sh
 npx drizzle-kit generate
```

3. lastly run migrates

```sh
npx drizzle-kit migrate
```

4. optionally you could run the seed command to populate your database

```sh
pnpm run db:seed
```
****
So no. 2 and 3 are the prominent commands to remember

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Icon Config

- `Lucide` for everything
- [Icones](https://icones.js.org/collection) for icons not covered by Lucide.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

##  Project Roadmap

- [X] **`Task 1`**: <strike>[AI Generated & Customizable Goals](https://github.com/chingu-voyages/V54-tier3-team-31/issues/18)</strike>
- [X] **`Task 2`**: <strike>[Progress Analytics & Reports](https://github.com/chingu-voyages/V54-tier3-team-31/issues/19)</strike>
- [ ] **`Task 3`**: [Smart Habit Tracker](https://github.com/chingu-voyages/V54-tier3-team-31/issues/17)
- [ ] **`Task 4`**: [Accountability & Social Features](https://github.com/chingu-voyages/V54-tier3-team-31/issues/20)
- [ ] **`Task 5`**: [Gamification & Rewards](https://github.com/chingu-voyages/V54-tier3-team-31/issues/36)
- [ ] **`Task 6`**: [AI Chatbot for motivation](https://github.com/chingu-voyages/V54-tier3-team-31/issues/35)
- [ ] **`Task 7`**: [AI-Powered Productivity Coach](https://github.com/chingu-voyages/V54-tier3-team-31/issues/34)
- [ ] **`Task 8`**: [Focus Mode & Time Blocking](https://github.com/chingu-voyages/V54-tier3-team-31/issues/33) 

## Figures

### User FLow (Prototype)

[Link](https://www.figma.com/design/sBcJEOErNz8E7Fw5P17xVC/GoalFlow-shadcn-ui?node-id=310-94861&t=RmPphneagt8RdqtF-0)

### Software Architecure 

![Image](https://github.com/user-attachments/assets/55cc525c-85d7-4af0-8f89-489632df7051)

### ERD

```mermaid
erDiagram
    users {
        text id PK
        text name
        text email
        timestamp emailVerified
        text image
    }
    accounts {
        text userId FK
        text type
        text provider
        text providerAccountId
        text refresh_token
        text access_token
        integer expires_at
        text token_type
        text scope
        text id_token
        text session_state
    }
    sessions {
        text sessionToken PK
        text userId FK
        timestamp expires
    }
    verificationTokens {
        text identifier PK
        text token PK
        timestamp expires
    }
    authenticators {
        text credentialID PK
        text userId FK
        text providerAccountId
        text credentialPublicKey
        integer counter
        text credentialDeviceType
        boolean credentialBackedUp
        text transports
    }
    goals {
        serial id PK
        text name
        text description
        text bestTimeTitle
        text bestTimeDescription
        timestamp createdAt
        timestamp updatedAt
        timestamp startDate
        timestamp endDate
        text frequency
        text userId FK
    }
    tasks {
        serial id PK
        text title
        text difficulty
        integer goalId FK
        text userId FK
        text frequency
        text duration
        timestamp createdAt
        timestamp updatedAt
        boolean completed
        timestamp completedAt
        text description
        boolean isInFocus
    }
    heatmap_statistics {
        text userId
        date completionDate
        text completedTasks
    }

    users ||--o{ accounts : "has many"
    users ||--o{ sessions : "has many"
    users ||--o{ verificationTokens : "has many"
    users ||--o{ authenticators : "has many"
    users ||--o{ goals : "has many"
    users ||--o{ tasks : "has many"
    goals ||--o{ tasks : "has many"
    tasks ||--o| goals : "belongs to"
```
### Component Tree

#### Plans Component
```mermaid
classDiagram
    Plans --> PlansContent
    PlansContent --> PlansHeader
    PlansContent --> TaskForm
    PlansContent --> TaskList
    PlansContent --> GoalsList
    PlansHeader --> Button
    PlansHeader --> DropdownMenu
    DropdownMenu --> DropdownMenuTrigger
    DropdownMenu --> DropdownMenuContent
    DropdownMenuContent --> DropdownMenuItem
    TaskForm --> Form
    TaskForm --> Input
    TaskForm --> FrequencyDropdown
    TaskForm --> DurationDropdown
    TaskForm --> TaskFormActions
    TaskList --> Task
    Task --> Form
    Task --> Input
    Task --> DropdownMenu
    Task --> Checkbox
    GoalsList --> Goal
    Goal --> Task
    Goal --> TaskForm
    Goal --> BestTimeInfo
    BestTimeInfo --> Input
    BestTimeInfo --> Button
click Plans call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/plans.tsx")
click PlansContent call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/plans.tsx#L18")
click PlansHeader call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/plans-header.tsx")
click TaskForm call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/task-form.tsx")
click TaskList call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/task-list.tsx")
click GoalsList call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/goals-list.tsx")
click Goal call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/goal.tsx")
click Task call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/task.tsx")
click BestTimeInfo call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/goal.tsx#L20")
```

#### Focus Component
```mermaid
classDiagram
    class Focus {
        +useSession()
        +useState()
        +useEffect()
        +useMemo()
        +handleTaskComplete()
        +handleAddPlanTask()
        +handleAddGoal()
        +handleAddTaskToGoal()
        +handleFrequencyChange()
        +handleDurationChange()
        +handleDeleteTask()
        +handleEditTask()
        +handleEditGoal()
        +handleEditBestTime()
    }
    class TaskGoalProvider {
        +refreshGoalsCallback
    }
    class GoalsList {
        +goals
        +form
        +onDeleteGoal()
        +onDeleteTask()
        +onEditTask()
        +onEditGoal()
        +onEditBestTime()
        +onAddTask()
        +useCheckbox
        +onTaskComplete()
    }
    class FocusTask {
        +id
        +title
        +frequency
        +duration
        +completed
        +form
        +onTaskComplete()
        +onFrequencyChange()
        +onDurationChange()
        +onDeleteTask()
        +onEditTask()
    }
    class TaskForm {
        +onAddTask()
        +onCancel()
    }
    class DropdownMenu {
        +DropdownMenuTrigger
        +DropdownMenuContent
        +DropdownMenuItem
    }
    class Button {
        +variant
        +size
        +className
    }

    Focus --> TaskGoalProvider : wraps
    Focus --> GoalsList : renders
    Focus --> FocusTask : renders
    Focus --> TaskForm : renders
    Focus --> DropdownMenu : renders
    Focus --> Button : renders
    GoalsList --> Goal : renders
    FocusTask --> DropdownMenu : uses
    FocusTask --> Button : uses
    TaskForm --> Button : uses
    TaskForm --> DropdownMenu : uses
click Focus call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/focus/focus.tsx#L1")
click TaskGoalProvider call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/hooks/useTaskGoalContext.tsx")
click GoalsList call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/goals-list.tsx#L1")
click FocusTask call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/focus/focus-task.tsx#L1")
click TaskForm call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/plans/task-form.tsx")
click DropdownMenu call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/ui/dropdown-menu.tsx")
click Button call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/ui/button.tsx")
```

#### Progress Component

```mermaid
classDiagram
    class Progress {
        +fetchHeatmapData()
        +fetchHabits()
        +handlePrev()
        +handleNext()
        +handleSelectHabit(habit: Habit)
        +handleTaskChanged()
    }
    Progress --> HabitCompletions : Renders when a habit is selected
    Progress --> CompletionCard : Renders a list of habits
    Progress --> CalendarHeatmap : Displays heatmap for productivity trend
    Progress --> Tabs : Toggles between weekly and monthly views
    Progress --> Button : Navigation buttons for heatmap
    Progress --> Tooltip : Displays heatmap tooltips
    CompletionCard --> Card : Displays habit completion summary
    HabitCompletions --> Card : Displays individual task completions
    HabitCompletions --> Checkbox : Toggles task completion status
    HabitCompletions --> Button : Back button and dropdown actions
    HabitCompletions --> DropdownMenu : Provides task actions
    HabitCompletions --> DropdownMenuItem : Deletes a task
    HabitCompletions --> DropdownMenuTrigger : Triggers dropdown menu
click Progress call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/progress/progress.tsx#L1")
click HabitCompletions call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/progress/habit-completions.tsx#L1")
click CompletionCard call linkCallback("/Users/jerichowenzel/Desktop/V54-tier3-team-31/src/components/progress/completion-card.tsx#L1")
```

#### Account Component

```mermaid
classDiagram
    class Account {
        +useSession()
        +signIn(provider: string)
        +signOut()
    }
    class Card {
        +CardContent
    }
    class Button {
        +onClick()
    }
    class Image {
        +src: string
        +alt: string
        +width: number
        +height: number
    }

    Account --> Card : uses
    Account --> Button : uses
    Account --> Image : uses
    Card --> CardContent : contains
```

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team *before* you start
coding!

- Abishek Devendran #1: [GitHub](https://github.com/abishekdevendran) / [LinkedIn](https://www.linkedin.com/in/abishekdevendran)
- Jericho Serrano #2: [GitHub](https://github.com/jericho1050) / [LinkedIn](https://www.linkedin.com/in/jericho-wenzel-serrano-b6b9a22a3/)
- Win Win Khaing (Thea) #3: [GitHub](https://github.com/TheaWin) / [LinkedIn](https://www.linkedin.com/in/thea-win)
- Sophie Jiang #4: [GitHub](https://github.com/sophiejiang) / [LinkedIn](https://www.linkedin.com/in/hello-sophiejiang)
- Teammate name #n: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)


## <summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/chingu-voyages/V54-tier3-team-31/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=chingu-voyages/V54-tier3-team-31">
   </a>
</p>
</details>
