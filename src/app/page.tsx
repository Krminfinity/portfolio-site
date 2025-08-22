import Image from "next/image";
import Link from "next/link";

// GitHub APIからリポジトリ情報を取得
type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
};

async function getRepos(): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/users/Krminfinity/repos?per_page=100", {
    next: { revalidate: 3600 }, // 1時間キャッシュ
  });
  if (!res.ok) return [];
  const data: Repo[] = await res.json();
  // スター数順でソート
  return data
    .filter((repo) => !repo.fork && repo.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export default async function Home() {
  const repos: Array<{
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
  }> = await getRepos();
  return (
    <div className="font-sans min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 pb-20">
      <header className="mb-8 text-center flex flex-col items-center gap-2">
        <Image src="https://avatars.githubusercontent.com/Krminfinity" alt="Krminfinity" width={80} height={80} className="rounded-full mb-2 border border-gray-300 dark:border-gray-700" />
        <h1 className="text-3xl font-bold mb-1">Krminfinity</h1>
        <p className="text-gray-700 dark:text-gray-300 text-base">ソフトウェアエンジニア / Web開発 / 機械学習</p>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs">TypeScript</span>
          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs">React</span>
          <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded text-xs">Next.js</span>
          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded text-xs">Python</span>
          <span className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 px-2 py-1 rounded text-xs">機械学習</span>
        </div>
        <div className="mt-4 text-left max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-1">経歴</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 mb-2">
            <li>2021年〜：大学で情報工学を専攻</li>
            <li>2023年〜：Web開発・機械学習の個人/チーム開発に従事</li>
            <li>2024年〜：OSS活動・技術ブログ執筆</li>
          </ul>
          <h2 className="text-lg font-semibold mb-1">PR・アピールポイント</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">新しい技術のキャッチアップと実践が得意です。チーム開発経験が豊富で、設計から実装・運用まで一貫して対応可能です。ユーザー目線を大切にしたUI/UX設計や、パフォーマンス・保守性を意識した開発を心がけています。</p>
        </div>
        <div className="flex gap-4 justify-center mt-3">
          <a href="mailto:your.email@example.com" className="text-gray-500 hover:text-blue-600 text-sm underline">メール</a>
          <a href="https://github.com/Krminfinity" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 text-sm underline">GitHub</a>
          <a href="https://www.linkedin.com/in/your-linkedin-id" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 text-sm underline">LinkedIn</a>
        </div>
      </header>
      <main className="max-w-2xl mx-auto">
        {/* メインレポジトリ3件のみ表示 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">主要プロジェクト要約</h2>
          <ul className="space-y-4">
            {/* ここは手動で編集してください。サンプルを3件記載 */}
            <li className="bg-blue-50 dark:bg-blue-900 rounded p-4">
              <Link href="/project/main-repo1" className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline">main-repo1</Link>
              <p className="text-gray-700 dark:text-gray-200 text-sm mt-1">このプロジェクトではReactとNext.jsを活用し、パフォーマンスとユーザー体験を両立したWebアプリを開発しました。</p>
            </li>
            <li className="bg-blue-50 dark:bg-blue-900 rounded p-4">
              <Link href="/project/main-repo2" className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline">main-repo2</Link>
              <p className="text-gray-700 dark:text-gray-200 text-sm mt-1">機械学習を用いたデータ分析ツールを作成し、可視化や自動化に挑戦しました。</p>
            </li>
            <li className="bg-blue-50 dark:bg-blue-900 rounded p-4">
              <Link href="/project/main-repo3" className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline">main-repo3</Link>
              <p className="text-gray-700 dark:text-gray-200 text-sm mt-1">チーム開発でリーダーを担当し、設計から実装・運用まで一貫して対応しました。</p>
            </li>
          </ul>
        </section>
      </main>
      <footer className="mt-12 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Krminfinity
      </footer>
    </div>
  );
}
