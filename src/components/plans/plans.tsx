import React from "react";
import Goal from "./goal";
import NavigationMenu from "./navigation-menu";
import { WandSparkles, Plus } from "lucide-react";

const Plans: React.FC = () => {
  // Exercise goal tasks
  const exerciseTasks = [
    {
      title: "Stretch (neck, shoulders, back)",
      difficultyIcon: <WandSparkles size={16} />,
      difficultyText: "Simpler",
    },
    {
      title: "10 push-ups, squats, or jumping jacks",
      difficultyIcon: <WandSparkles size={16} />, 
      difficultyText: "Simpler",
    },
    {
      title: "Walk while listening to music/podcast",
      difficultyIcon: <WandSparkles size={16} />,
      difficultyText: "Simpler",
    },
  ];

  // Sleep goal tasks
  const sleepTasks = [
    {
      title: "Dim lights, activate night mode",
      difficultyIcon: <WandSparkles size={16} />,
      difficultyText: "Simpler",
    },
    {
      title: "Do 4-7-8 deep breathing.",
      difficultyIcon: <WandSparkles size={16} />,
      difficultyText: "Simpler",
    },
    {
      title: "Write one sentence about your day",
      difficultyIcon: <WandSparkles size={16} />,
      difficultyText: "Simpler",
    },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Status bar - This would be handled by the device */}
      
      {/* Main container */}
      <div className="flex flex-col flex-1 pb-16">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background pt-4 pb-3 px-4 flex items-center justify-between border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground">Plans</h1>
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Plus size={16} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex flex-col px-4 pt-2">
          <Goal
            title="Exercise to Get Healthier"
            tasks={exerciseTasks}
            bestTimeTitle="Best Time"
            bestTimeDescription="After a long coding session or before lunch, refresh your mind."
          />

          <Goal
            title="Sleep Early"
            tasks={sleepTasks}
            bestTimeTitle="Best Time"
            bestTimeDescription="30 minutes before bed."
          />

          <div className="flex items-center gap-2 mt-4 py-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground border border-border">+</div>
            <span className="text-muted-foreground text-sm font-medium">Add a Task</span>
            <div className="flex-grow"></div>
            <span className="text-muted-foreground">⋯</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationMenu />
    </div>
  );
};

export default Plans;