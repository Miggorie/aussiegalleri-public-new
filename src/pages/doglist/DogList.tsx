import useDogContext from "../../hooks/use-dog-context";
import {
  Dog,
  FilterBarProps,
  SearchBarProps,
} from "../../components/Interfaces";
import { useState } from "react";
import { FilterProps } from "../../components/Interfaces";

function DogList({
  searchTerm,
  filterTerm,
}: {
  searchTerm: string;
  filterTerm: FilterProps[];
}) {
  //Using the context to fetch all dogs from database
  const { dogs } = useDogContext();
  console.log(filterTerm);
  console.log(searchTerm);

  let filteredDogs = dogs;

  if (searchTerm) {
    if (searchTerm !== "") {
      filteredDogs = dogs.filter((dog) =>
        dog.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  } else {
    filteredDogs = dogs.filter((dog) => {
      if (!dogs.length || !filterTerm.length || !filterTerm[0].options.length) {
        console.log("Här vare tomt");
        return [];
      }

      let isChecked = false;
      filterTerm[0].options.forEach((option) => {
        if (
          option.checked &&
          (option.value === "tik" || option.value === "hane") &&
          (dog.gender === "tik" || dog.gender === "hane")
        ) {
          isChecked = true;
        }
      });
      return isChecked;
    });
  }

  const baseUrl = "http://aussiegalleri.se/images/thumbnails/";

  return (
    <div>
      <div className="bg-white">
        <h2 className="sr-only">Hundar</h2>
        <div className="grid grid-cols-1 gap-y-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-4">
          {filteredDogs?.map((filteredDog: Dog) => (
            <a
              key={filteredDog.dogID}
              href={`/dogs/${filteredDog.url}`}
              className="group"
            >
              <div className="aspect-ratio: auto w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-ratio:">
                <img
                  src={baseUrl + filteredDog.date + "/" + filteredDog.standLeft}
                  alt="hund"
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 mb-10 text-s text-gray-700">
                {filteredDog.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DogList;
