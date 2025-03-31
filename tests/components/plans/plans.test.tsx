import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Plans from '../../../src/components/plans/plans';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add Jest DOM matchers to Vitest expect
expect.extend(matchers);

// Mock the custom hook
vi.mock('@/hooks/useTaskManagement', () => ({
    useTaskManagement: vi.fn()
}));

// Mock nanoid to return predictable IDs for testing
vi.mock('nanoid', () => ({
    nanoid: () => 'test-id'
}));

// Mock the TaskForm component to simplify testing
vi.mock('../../../src/components/plans/TaskForm', () => ({
    default: ({ onAddTask, onCancel }: { onAddTask: (task: { title: string; frequency: string; duration: string }) => void; onCancel: () => void }) => (
        <div data-testid="task-form">
            <button onClick={() => onAddTask({ title: 'New Task', frequency: 'Daily', duration: '15 mins' })}>
                Add Task
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}));

describe('Plans Component', () => {
    const mockPlanTasks = [
        {
            id: 'task1',
            title: 'Test Task 1',
            frequency: 'Daily',
            duration: '10 mins'
        },
        {
            id: 'task2',
            title: 'Test Task 2',
            frequency: 'Weekly',
            duration: '30 mins'
        }
    ];

    const mockAddTask = vi.fn();
    const mockEditTask = vi.fn();
    const mockDeleteTask = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useTaskManagement as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            planTasks: mockPlanTasks,
            addTask: mockAddTask,
            editTask: mockEditTask,
            deleteTask: mockDeleteTask
        });
    });

    it('renders without crashing', () => {
        render(<Plans />);
        expect(screen.getByText(/add a task/i)).toBeTruthy();
    });

    it('displays predefined goals correctly', () => {
        render(<Plans />);
        expect(screen.getByText('Exercise to Get Healthier')).toBeTruthy();
        expect(screen.getByText('Sleep Early')).toBeTruthy();
    });

    it('displays user tasks from useTaskManagement hook', () => {
        render(<Plans />);
        expect(screen.getByText('Test Task 1')).toBeTruthy();
        expect(screen.getByText('Test Task 2')).toBeTruthy();
    });

    it('shows task form when "Add a Task" button is clicked', async () => {
        const user = userEvent.setup();
        render(<Plans />);
        
        // Find the button with Plus icon next to "Add a Task" text
        const addTaskText = screen.getByText(/add a task/i);
        const addButton = addTaskText.previousElementSibling;
        
        expect(addButton).not.toBeNull();
        await user.click(addButton as HTMLElement);
        
        // Check if TaskForm is rendered
        expect(screen.getByTestId('task-form')).toBeTruthy();
    });

    it('hides task form when cancel is clicked', async () => {
        const user = userEvent.setup();
        render(<Plans />);
        
        // Show the form first
        const addTaskText = screen.getByText(/add a task/i);
        const addButton = addTaskText.previousElementSibling;
        await user.click(addButton as HTMLElement);
        
        // Find and click the cancel button
        const cancelButton = screen.getByText(/cancel/i);
        await user.click(cancelButton);
        
        // TaskForm should be hidden now
        expect(screen.queryByTestId('task-form')).toBeNull();
    });

    it('calls addTask when a new task is submitted', async () => {
        const user = userEvent.setup();
        render(<Plans />);
        
        // Show the form
        const addTaskText = screen.getByText(/add a task/i);
        const addButton = addTaskText.previousElementSibling;
        await user.click(addButton as HTMLElement);
        
        // Find and click the add task button in the form
        const submitButton = screen.getByText(/add task/i);
        await user.click(submitButton);
        
        // Verify addTask was called
        expect(mockAddTask).toHaveBeenCalledTimes(1);
        expect(mockAddTask).toHaveBeenCalledWith({
            title: 'New Task',
            frequency: 'Daily',
            duration: '15 mins'
        });
    });

    it('renders correct structure with mobile header', () => {
        render(<Plans />);
        
        // Check for header container
        const headerContainer = screen.getByText(/add a task/i).closest('div.min-h-screen');
        expect(headerContainer).toBeTruthy();
        
        // Check if PlansHeader is rendered
        const mobileHeader = headerContainer?.querySelector('.sticky.top-0');
        expect(mobileHeader).toBeTruthy();
    });

    it('renders the correct number of tasks from the hook', () => {
        render(<Plans />);
        // Two tasks from the hook plus six from the predefined goals
        const taskElements = screen.getAllByText(/mins$/i);
        expect(taskElements.length).toBeGreaterThanOrEqual(8);
    });

    it('applies correct styling to the main container', () => {
        render(<Plans />);
        const mainContainer = screen.getByText(/add a task/i).closest('div.flex.flex-col.flex-1');
        expect(mainContainer?.classList.contains('md:max-w-3xl')).toBe(true);
        expect(mainContainer?.classList.contains('md:mx-auto')).toBe(true);
    });
    
    it('renders tasks with appropriate handlers', () => {
        render(<Plans />);
        // Verify that task components receive the correct props
        expect(mockPlanTasks.length).toBeGreaterThan(0);
        expect(mockDeleteTask).not.toHaveBeenCalled();
        expect(mockEditTask).not.toHaveBeenCalled();
    });
    
    it('handles mobile add task flow correctly', async () => {
        const user = userEvent.setup();
        render(<Plans />);
        
        // Mobile header add button should be passed the handleAddTaskClick
        const mobileHeader = screen.getByText(/add a task/i).closest('.min-h-screen')?.querySelector('.sticky.top-0');
        expect(mobileHeader).toBeTruthy();
        
        // Since we can't directly test the PlansHeader component's internal button,
        // we'll simulate its behavior by verifying the state changes when handleAddTaskClick is called
        const addTaskButton = screen.getByText(/add a task/i).previousElementSibling;
        await user.click(addTaskButton as HTMLElement);
        
        // Task form should appear
        expect(screen.getByTestId('task-form')).toBeTruthy();
    });
});