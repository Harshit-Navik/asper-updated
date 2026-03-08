"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Loader2 } from "lucide-react";
import { Quiz } from "@prisma/client";

export default function QuizListPage() {

    const { data: session, status } = useSession();

    const [quizzes, setQuizzes] = useState<(Quiz & { attempted?: boolean })[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const [filter, setFilter] = useState("all");

    const fetchQuizzes = async (selectedFilter = "all") => {

        if (!session?.user) return;

        try {

            let url = "/api/quiz";

            if (selectedFilter !== "all") {
                url = `/api/quiz?filter=${selectedFilter}`;
            }

            const res = await fetch(url);

            if (!res.ok) {
                console.error("Failed to fetch quizzes");
                setQuizzes([]);
                return;
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                setQuizzes(data);
            } else {
                setQuizzes([]);
            }

        } catch (error) {
            console.error("Failed to fetch quizzes", error);
            setQuizzes([]);
        }
        finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        if (status === "authenticated") {
            fetchQuizzes(filter);
        }

        else if (status === "unauthenticated") {
            setLoading(false);
        }

    }, [session, status, filter]);

    const handleDelete = async (id: string) => {

        if (!confirm("Are you sure you want to delete this quiz?")) return;

        setProcessingId(id);

        try {

            const res = await fetch(`/api/quiz/${id}`, { method: "DELETE" });

            if (res.ok) {
                setQuizzes(quizzes.filter(q => q.id !== id));
            }

            else {
                alert("Failed to delete quiz");
            }

        }

        catch (error) {
            console.error("Error deleting quiz", error);
        }

        finally {
            setProcessingId(null);
        }

    };

    if (status === "loading" || loading) {

        return (

            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="animate-spin text-neon-red w-8 h-8" />
            </div>

        );

    }

    if (status === "unauthenticated") {

        return (

            <div className="text-center py-20">

                <h1 className="text-3xl font-bold mb-4 font-montserrat">
                    Access Denied
                </h1>

                <p className="text-gray-400 mb-8">
                    Please login to view active quizzes.
                </p>

                <Link
                    href="/login"
                    className="px-6 py-2 bg-neon-red text-white font-bold rounded-md hover:bg-red-600 transition-all"
                >
                    Login
                </Link>

            </div>

        );

    }

    const isAdmin = session?.user?.role === "ADMIN";

    return (

        <div className="py-8">

            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-4xl font-black font-montserrat uppercase">
                        Quizzes
                    </h1>

                    <p className="text-neon-red font-medium tracking-widest mt-2">

                        {isAdmin
                            ? "All Quizzes"
                            : `${session?.user?.domain?.[0]?.replace(/_/g, " ") || "Your"} Department Quizzes`
                        }

                    </p>

                </div>

                <div className="flex items-center gap-4">

                    {/* UPDATED FILTER STYLE */}

                    {!isAdmin && (

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-deep-black border border-white/10 px-4 py-2 rounded-lg text-sm text-white hover:border-neon-red/50 focus:outline-none focus:border-neon-red transition-all"
                        >

                            <option value="all">All Quizzes</option>
                            <option value="attempted">Attempted</option>
                            <option value="not_attempted">Not Attempted</option>

                        </select>

                    )}

                    {isAdmin && (

                        <Link
                            href="/quiz/create"
                            className="flex items-center gap-2 px-6 py-3 bg-neon-red text-white font-bold rounded-md hover:bg-red-600 transition-all hover:shadow-[0_0_20px_rgba(255,0,51,0.4)]"
                        >

                            <PlusCircle size={20} />
                            Create Quiz

                        </Link>

                    )}

                </div>

            </div>

            {quizzes.length === 0 ? (

                <div className="bg-white/5 border border-white/10 rounded-xl p-10 text-center">
                    <p className="text-gray-400">
                        No active quizzes found for your department at this time.
                    </p>
                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {quizzes.map((quiz) => (

                        <div
                            key={quiz.id}
                            className="bg-deep-black border border-white/10 rounded-xl p-6 h-full transition-all hover:border-neon-red/50 hover:shadow-[0_0_15px_rgba(255,0,51,0.2)] flex flex-col relative group"
                        >

                            <Link href={`/quiz/${quiz.id}`} className="block flex-grow">

                                {/* UPDATED BADGE LAYOUT */}

                                <div className="flex justify-between items-start mb-4">

                                    <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-gray-300 uppercase">
                                        {quiz.department.replace(/_/g, " ")}
                                    </span>

                                    <div className="flex items-center gap-2">

                                        {quiz.attempted && !isAdmin && (
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-400 uppercase">
                                                Attempted
                                            </span>
                                        )}

                                        <span
                                            className={`text-xs font-bold px-2 py-1 rounded uppercase ${quiz.status === "ACTIVE"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : quiz.status === "INACTIVE"
                                                        ? "bg-red-500/20 text-red-400"
                                                        : "bg-gray-500/20 text-gray-400"
                                                }`}
                                        >

                                            {quiz.status}

                                        </span>

                                    </div>

                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-red transition-colors">
                                    {quiz.title}
                                </h3>

                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                    {quiz.description}
                                </p>

                                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-white/10">

                                    <span>
                                        {quiz.timeLimit ? `${quiz.timeLimit} mins` : "No limit"}
                                    </span>

                                    {/* UPDATED START BUTTON */}

                                    <span className="text-neon-red group-hover:underline">

                                        {quiz.attempted ? "View Result →" : "Start Quiz →"}

                                    </span>

                                </div>

                            </Link>

                            {isAdmin && (

                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/10">

                                    <Link
                                        href={`/quiz/${quiz.id}/edit`}
                                        className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
                                    >

                                        Edit

                                    </Link>

                                    <button
                                        disabled={processingId === quiz.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(quiz.id);
                                        }}
                                        className="text-xs px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors disabled:opacity-50"
                                    >

                                        Delete

                                    </button>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}