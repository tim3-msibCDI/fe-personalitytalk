"use client";
import { useRouter } from 'next/navigation';
import { tesmental } from '@/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TesForm({ params }) {
  const router = useRouter();
  const { title, questionId } = params;

  // Mengonversi title menjadi format yang cocok dengan data
  const formattedTitle = title.replace(/-/g, ' ').toLowerCase();

  // Menemukan tes berdasarkan title
  const detailTes = tesmental.find(
    (item) => item.title.toLowerCase() === formattedTitle
  );

  // Mengelola state untuk pertanyaan saat ini
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (detailTes) {
      const questionIndex = parseInt(questionId, 10) - 1;
      setCurrentQuestion(detailTes.questions[questionIndex]);
      setSelectedAnswer(null);
    }
  }, [detailTes, questionId]);

  if (!detailTes) {
    return <div>Tes tidak ditemukan</div>;
  }

  if (!currentQuestion) {
    return <div>Pertanyaan tidak ditemukan</div>;
  }

  // Fungsi navigasi antara pertanyaan berikutnya dan sebelumnya
  const handleNavigation = (direction) => {
    const nextId = parseInt(questionId, 10) + direction;
    if (nextId >= 1 && nextId <= detailTes.questions.length) {
      router.push(`/tes-mental/${title}/${nextId}`);
    }
  };

  // Fungsi untuk menyelesaikan tes
  const handleFinish = () => {
    router.push('/hasil-tes'); // Sesuaikan rute ke halaman hasil tes
  };

  // Apakah saat ini berada di pertanyaan terakhir
  const isLastQuestion = parseInt(questionId, 10) === detailTes.questions.length;

  return (
    <section className="p-6">
      <div className="p-4">
        <h3 className="text-h3 font-semibold mb-2">
          Pertanyaan {questionId}/{detailTes.questions.length}
        </h3>
        <h2 className="mb-4 text-h2 font-semibold">{currentQuestion.question}</h2>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.option}
              onClick={() => setSelectedAnswer(option.option)}
              className={`${
                selectedAnswer === option.option ? 'bg-primary' : 'bg-primarylight'
              } p-2 px-4 text-start text-m rounded-xl hover:bg-primarylight`}
            >
              {option.option}. {option.text}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-m font-semibold">
          <button
            onClick={() => handleNavigation(-1)}
            disabled={parseInt(questionId, 10) === 1}
            className="text-primary py-2 px-4 disabled:text-white"
          >
            Sebelumnya
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleFinish}
              disabled={!selectedAnswer}
              className={`${
                selectedAnswer ? 'bg-primary text-white' : 'bg-disable text-gray-400'
              } px-4 py-2 rounded-lg`}
            >
              Selesai
            </button>
          ) : (
          <button
            onClick={() => handleNavigation(1)}
            disabled={parseInt(questionId, 10) === detailTes.questions.length}
            className="bg-primary text-whitebg py-2 px-4 rounded-lg disabled:opacity-100"
          >
            Selanjutnya
          </button>
          )}
        </div>
      </div>
    </section>
  );
}
