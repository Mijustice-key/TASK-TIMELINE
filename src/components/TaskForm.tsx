import { useState } from 'react';

type TaskFormProps = {
  onAdd: (task: Task) => void;
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

export default TaskForm;