"use client";
import { useState } from "react";
import CardCourse from "./cardcourse";
import Image from "next/image";

const ListCourse = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Show 6 cards per page

  // Calculate the index of the first and last cards on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = courses.slice(indexOfFirstCard, indexOfLastCard);

  // Calculate total number of pages
  const totalPages = Math.ceil(courses.length / cardsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center mx-20">
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((course) => (
          <CardCourse
            key={course.id}
            id={course.id}
            name={course.name}
            description={course.description}
            rating={course.rating}
            price={course.price}
            imageUrl={course.imageUrl}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="w-full px-16">
        <div className="flex mt-6 space-x-2 justify-end">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-primary disabled:opacity-50"
          >
            <Image
              src="/icons/arrow-left-pagenation.svg"
              alt="<"
              height={10}
              width={10}
            />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 ${
                currentPage === index + 1
                  ? "bg-primary text-whitebg"
                  : "text-primary"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-primary disabled:opacity-50"
          >
            <Image
              src="/icons/arrow-right-pagenation.svg"
              alt="<"
              height={10}
              width={10}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCourse;
