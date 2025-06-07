import React, { useEffect, useState } from 'react';

interface Step {
  targetId: string;
  text: string;
}

const steps: Step[] = [
  {
    targetId: 'create-project-btn',
    text: 'Нажмите «Создать новую страницу», чтобы начать работу',
  },
  {
    targetId: 'view-toggle-desktop',
    text: 'Переключайте виды страницы здесь',
  },
];

export const Onboarding: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const done = localStorage.getItem('onboardingDone');
    if (done) {
      setIndex(-1);
    }
  }, []);

  useEffect(() => {
    if (index < 0 || index >= steps.length) {
      return;
    }
    const { targetId } = steps[index];
    const el = document.getElementById(targetId);
    if (el) {
      el.classList.add('onboarding-highlight');
    }
    return () => {
      if (el) {
        el.classList.remove('onboarding-highlight');
      }
    };
  }, [index]);

  if (index < 0 || index >= steps.length) {
    return null;
  }

  const next = () => {
    if (index + 1 >= steps.length) {
      localStorage.setItem('onboardingDone', 'true');
      setIndex(-1);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow max-w-sm text-center space-y-4">
        <p>{steps[index].text}</p>
        <button
          onClick={next}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {index + 1 === steps.length ? 'Завершить' : 'Далее'}
        </button>
      </div>
    </div>
  );
};
