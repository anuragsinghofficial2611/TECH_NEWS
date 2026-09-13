
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:3000/news/ai";

function getScoreLabel(score) {
  if (score >= 90) return "Critical";
  if (score >= 75) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

function getScoreRing(score) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return {
    circumference,
    offset,
  };
}

export default function AINews() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }


        setStories(data.stories || []);
      } catch (err) {
        console.error("Failed to fetch AI news:", err);
        setError("Unable to load AI news. Make sure your backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-150px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute top-[30%] right-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-fuchsia-600/5 blur-[130px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-14">

        {/* ================= HEADER ================= */}

        <motion.header
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <span className="text-lg">✦</span>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                Intelligence Feed
              </p>

              <p className="text-xs text-zinc-500">
                AI & Technology
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                What's happening in{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  AI
                </span>
                ?
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                The most important AI developments, distilled into
                concise stories and ranked by impact.
              </p>
            </div>

            {!loading && !error && (
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-sm text-zinc-300">
                  {stories.length} stories
                </span>
              </div>
            )}
          </div>
        </motion.header>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 }}
                className="h-[300px] animate-pulse rounded-3xl border border-white/5 bg-white/[0.025]"
              />
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-xl">
              !
            </div>

            <h2 className="text-lg font-semibold">
              Couldn't load the news
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {error}
            </p>
          </motion.div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading && !error && stories.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-12 text-center">
            <p className="text-zinc-400">
              No AI stories available right now.
            </p>
          </div>
        )}

        {/* ================= NEWS GRID ================= */}

        {!loading && !error && stories.length > 0 && (
          <section className="grid gap-5 md:grid-cols-2">
            {stories.map((story, index) => {
              const score = Number(story.importance_score) || 0;
              const ring = getScoreRing(score);

              return (
                <motion.article
                  key={story.article_id || index}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/20 hover:bg-white/[0.045]"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-violet-600/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top section */}
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                        <span className="text-sm font-bold text-zinc-300">
                          #{story.rank}
                        </span>
                      </div>

                      {/* Category */}
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                          {story.category}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                      <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 48 48"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-white/5"
                        />

                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="text-violet-400"
                          strokeDasharray={ring.circumference}
                          initial={{
                            strokeDashoffset: ring.circumference,
                          }}
                          animate={{
                            strokeDashoffset: ring.offset,
                          }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </svg>

                      <div className="relative text-center">
                        <p className="text-sm font-bold">
                          {score}
                        </p>
                        <p className="text-[8px] uppercase tracking-wider text-zinc-500">
                          score
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="relative mt-7">
                    <h2 className="text-xl font-semibold leading-8 tracking-tight text-white transition-colors group-hover:text-violet-100">
                      {story.summary}
                    </h2>
                  </div>

                  {/* Why it matters */}
                  <div className="relative mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm">⚡</span>

                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Why it matters
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-zinc-400">
                      {story.why_it_matters}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="font-mono text-[10px] text-zinc-600">
                      {story.article_id}
                    </span>

                    <span
                      className={`text-xs font-medium ${
                        score >= 90
                          ? "text-red-400"
                          : score >= 75
                            ? "text-orange-400"
                            : score >= 50
                              ? "text-yellow-400"
                              : "text-zinc-500"
                      }`}
                    >
                      {getScoreLabel(score)} impact
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </section>
        )}

        {/* ================= FOOTER ================= */}

        {!loading && !error && stories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row"
          >
            <p>
              AI intelligence feed
            </p>

            <p>
              Ranked by importance
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}