import React from 'react';
import { Link } from 'react-router-dom';

const LessonContainer = ({ lesson }) => {
  return (
    <section className="text-palette-2 bg-gradient-to-r from-palette-1 to-palette-4 rounded-lg shadow-md mb-3 pb-2">
      <div className="relative p-3 z-10">
        {/* Header */}
        <div className="mb-2 border-b border-palette-2 pb-1">
          <p className="font-bold opacity-80 uppercase tracking-wider text-shadow text-palette-3 text-xs">
            Lesson {lesson.lessonNumber}
          </p>
          <h4 className="font-bold text-sm sm:text-base md:text-lg text-shadow mb-1 text-palette-2">{lesson.lessonTitle}</h4>
          <p className="font-bold opacity-80 tracking-wider text-shadow text-palette-3 text-xs">{lesson.lessonPages}</p>
        </div>

        {/* Content */}
        <ul className="text-sm flex flex-col gap-1">
          {lesson.lessonUnits.map((unit) => (
            <li key={unit.unitUrl}>
              <Link
                to={`/quiz/lessons/${lesson.lessonUrl}/${unit.unitUrl}`}
                className="block bg-palette-2/80 hover:bg-palette-3 text-palette-6 font-bold rounded-md shadow-sm px-3 py-1 transition-all duration-200 border border-palette-3 hover:scale-105"
              >
                {unit.unitTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LessonContainer;
