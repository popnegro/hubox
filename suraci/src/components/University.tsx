import React, { useState } from 'react';
import { MOCK_UNIVERSITY_COURSES, UNIVERSITY_RANKING } from '../data';
import { Course } from '../types';
import { Play, Award, CheckCircle, HelpCircle, Trophy, BookOpen, Star, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function University() {
  const [courses, setCourses] = useState<Course[]>(MOCK_UNIVERSITY_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(MOCK_UNIVERSITY_COURSES[1].id); // default barismo
  
  // Interactive Quiz evaluation state
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  
  // Video Play Simulation
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    setSelectedAnswerIdx(null);
    setQuizSubmitted(false);
    setQuizScore(null);
    setIsPlaying(false);
  };

  const handleAnswerClick = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswerIdx(idx);
  };

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswerIdx === null || !selectedCourse) return;

    const isCorrect = selectedAnswerIdx === selectedCourse.evaluation.correctIndex;
    const finalScore = isCorrect ? 100 : 0;
    
    setQuizSubmitted(true);
    setQuizScore(finalScore);

    // Update Course list completion state
    if (isCorrect) {
      const updated = courses.map(c => {
        if (c.id === selectedCourse.id) {
          return {
            ...c,
            progress: 100,
            completed: true,
            evaluation: {
              ...c.evaluation,
              score: 100
            }
          };
        }
        return c;
      });
      setCourses(updated);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswerIdx(null);
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  return (
    <div id="university-view" className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Universidad Suraci</h1>
          <p className="text-slate-500 text-sm">Portal de e-learning corporativo y evaluación de competencias del personal de locales.</p>
        </div>
      </div>

      {/* Main split dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Courses list & Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Courses selection list */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <BookOpen size={16} className="text-blue-700" /> Cursos Disponibles
            </h3>

            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {courses.map((course) => {
                const isSelected = course.id === selectedCourseId;
                return (
                  <div
                    key={course.id}
                    onClick={() => handleSelectCourse(course.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/10 shadow-sm'
                        : 'border-slate-100 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-mono text-slate-400">{course.duration}</span>
                      {course.completed ? (
                        <span className="bg-emerald-50 text-emerald-800 text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-100">
                          Aprobado
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-100">
                          {course.progress}% cursado
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{course.title}</h4>
                    
                    {/* Progress indicator */}
                    <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
                      <div className={`h-full ${course.completed ? 'bg-emerald-600' : 'bg-blue-600'}`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ranking & Leaderboard */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Trophy size={16} className="text-amber-400" /> Ranking de Sucursales
            </h3>
            <p className="text-[11px] text-slate-400">Score consolidado por tasa de aprobación de inducciones obligatorias en locales.</p>

            <div className="space-y-2.5">
              {UNIVERSITY_RANKING.map((rank) => (
                <div key={rank.rank} className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      rank.rank === 1 ? 'bg-amber-400 text-slate-900' :
                      rank.rank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-slate-700 text-white'
                    }`}>
                      {rank.rank}
                    </span>
                    <span className="text-xs font-medium text-slate-200 truncate max-w-[150px]">{rank.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-100 font-mono">{rank.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Video Player & Exam evaluation */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          
          {/* Section banner */}
          <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
            <div>
              <span className="text-[9px] text-blue-700 font-bold uppercase tracking-widest">{selectedCourse.category}</span>
              <h2 className="text-base font-bold text-slate-900 mt-1">{selectedCourse.title}</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono font-medium">{selectedCourse.lessonsCount} lecciones integrales</span>
          </div>

          {/* Simulated Video Player */}
          <div className="aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden relative group flex items-center justify-center">
            {isPlaying ? (
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-transparent text-white font-sans z-10">
                <div className="flex justify-between items-center text-xs bg-slate-950/40 p-2 rounded">
                  <span className="font-semibold">Reproduciendo: Lección 3. Procedimiento y Buenas Prácticas</span>
                  <span className="text-[10px] text-emerald-400 font-mono">1080p HD</span>
                </div>
                {/* Simulated center action */}
                <div className="text-center">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20"
                  >
                    ||
                  </button>
                </div>
                {/* Control bar */}
                <div className="space-y-2 bg-slate-950/60 p-2 rounded">
                  <div className="w-full bg-white/20 h-1 rounded-full relative overflow-hidden">
                    <div className="bg-blue-600 h-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span>02:15 / 05:40</span>
                    <span>Subtítulos en Español</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Cover poster */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] bg-slate-900"></div>
                
                <div className="text-center relative z-10 space-y-4 max-w-sm px-4">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-all shadow-lg hover:scale-105 mx-auto"
                  >
                    <Play size={20} className="ml-1" />
                  </button>
                  <p className="text-xs font-semibold text-slate-300">Reproducir clase de inducción obligatoria</p>
                  <p className="text-[10px] text-slate-500">Módulo multimedia interactivo preparado por Consultores de Marca.</p>
                </div>
              </>
            )}
          </div>

          {/* Quiz Evaluation Form */}
          <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
              <Award size={16} className="text-amber-500" /> Evaluación de Desempeño Obligatoria
            </h3>
            
            <form onSubmit={handleSubmitEvaluation} className="space-y-4">
              <p className="text-xs font-semibold text-slate-700 leading-normal">{selectedCourse.evaluation.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCourse.evaluation.options.map((option, idx) => {
                  const isAnswerSelected = selectedAnswerIdx === idx;
                  let optionStyle = 'border-slate-200 bg-white hover:border-slate-300';
                  
                  if (isAnswerSelected) {
                    optionStyle = 'border-blue-500 bg-blue-50/20 text-blue-800 font-semibold';
                  }

                  if (quizSubmitted) {
                    if (idx === selectedCourse.evaluation.correctIndex) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                    } else if (isAnswerSelected) {
                      optionStyle = 'border-red-500 bg-red-50 text-red-800 line-through';
                    } else {
                      optionStyle = 'border-slate-100 bg-white opacity-50';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswerClick(idx)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{option}</span>
                      <HelpCircle size={14} className="text-slate-400 shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>

              {/* Quiz results banner */}
              {quizSubmitted && (
                <div className={`p-4 rounded-lg text-xs font-medium flex items-center justify-between ${
                  quizScore === 100 ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  <span>
                    {quizScore === 100 ? '¡Excelente! Evaluación Aprobada (100/100). Personal habilitado.' : 'Intento Fallido. Repase el video de procesos y vuelva a intentar.'}
                  </span>
                  {quizScore === 0 && (
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="text-xs font-bold hover:underline underline-offset-2 flex items-center gap-1.5 shrink-0"
                    >
                      <RefreshCw size={12} /> Reintentar Quiz
                    </button>
                  )}
                </div>
              )}

              {!quizSubmitted && (
                <button
                  type="submit"
                  disabled={selectedAnswerIdx === null}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2 rounded-lg transition-all disabled:opacity-40"
                >
                  Enviar Evaluación Oficial
                </button>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
