'use client';
import { useState } from 'react';

//
// 型定義
//
type Task = {
  id: number;
  title: string;
  progress: number;
};

type TaskFormProps = {
  onAdd: (task: Task) => void;
};

type TaskCardProps = {
  task: Task;
  onUpdateProgress: (newProgress: number) => void;
  onDelete: (id: number) => void;
};

//
// TaskForm コンポーネント
//
function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      progress: 0,
    };
    onAdd(newTask);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを追加"
        className="flex-1 border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        追加
      </button>
    </form>
  );
}

//
// TaskCard コンポーネント
//
function TaskCard({ task, onUpdateProgress, onDelete }: TaskCardProps) {
  return (
    <div className="relative p-4 bg-white rounded shadow border">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-blue-600"
        onClick={() => onUpdateProgress(Math.min(task.progress + 10, 100))}
      >
        ✏️
      </button>
      <button
        className="absolute top-2 right-8 text-red-400 hover:text-red-600"
        onClick={() => onDelete(task.id)}
      >
        🗑
      </button>
      <h2 className="text-lg font-semibold mb-1">{task.title}</h2>
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-right mt-1 text-blue-600">
        進捗：{task.progress}%
      </p>
    </div>
  );
}

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
