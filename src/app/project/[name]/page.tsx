export function generateStaticParams() {
  return [
    { name: "main-repo1" },
    { name: "main-repo2" },
    { name: "main-repo3" },
  ];
}
import { notFound } from "next/navigation";

async function getRepo(name: string) {
  const res = await fetch(`https://api.github.com/repos/Krminfinity/${name}`);
  if (!res.ok) return null;
  return await res.json();
}

export default async function ProjectDetail({ params }: { params: { name: string } }) {
  const repo = await getRepo(params.name);
  if (!repo) return notFound();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{repo.name}</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-200">{repo.description}</p>
      <div className="mb-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🛠 {repo.language || "言語不明"}</span>
        <span>更新: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline mb-6 inline-block">GitHubで見る</a>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-2">工夫点・技術的チャレンジ・学び</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 text-sm text-gray-700 dark:text-gray-200">
          {/* ここに各プロジェクトごとに自由記述を追加してください。例： */}
          <ul className="list-disc list-inside">
            <li>このプロジェクトでは○○の技術を初めて導入し、パフォーマンス改善に取り組みました。</li>
            <li>UI/UX設計で△△を工夫し、ユーザー体験向上を目指しました。</li>
            <li>チーム開発での役割や、学んだことをまとめて記載できます。</li>
          </ul>
          {/* 実際の内容は、面接や選考に合わせて自由に編集してください。 */}
        </div>
      </section>
    </div>
  );
}
