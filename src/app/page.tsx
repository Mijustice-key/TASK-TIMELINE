'use client';
import { useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
//
// Home コンポーネント
//
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task): void => {
    setTasks((prev) => [...prev, task]);
  };

  const handleDeleteTask = (id: number): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleProgressChange = (id: number, newProgress: number): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, progress: newProgress } : task
      )
    );
  };

  return (
    <main className="flex flex-col md:flex-row gap-4 p-4">
      {/* タスク一覧 */}
      <div className="md:w-2/3 w-full space-y-4">
        <TaskForm onAdd={handleAddTask} />
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateProgress={(val) => handleProgressChange(task.id, val)}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {/* カレンダー（PCだけ表示） */}
      <aside className="hidden md:block w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4">カレンダー</h2>
        <div className="bg-gray-100 p-4 rounded shadow text-center text-gray-500">
          📅 カレンダー仮表示（後で実装）
        </div>
      </aside>
    </main>
  );
}
