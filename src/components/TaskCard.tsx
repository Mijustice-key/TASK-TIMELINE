type TaskCardProps = {
  task: Task;
  onUpdateProgress: (newProgress: number) => void;
  onDelete: (id: number) => void;
};

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

export default TaskCard;