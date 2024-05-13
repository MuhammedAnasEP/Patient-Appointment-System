import React from "react";

export default function AddPatientForm() {
  return (
    <>
      <section
        id="contact"
        class="relative w-full min-h-screen text-blue-500"
      >
        <h1 class="text-4xl p-4 font-bold tracking-wide">Add Patient</h1>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-800 h-32 w-full"></div>

        <div class="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
          <form action="#" class="w-full md:w-1/2 border border-blue-500 p-6 bg-gray-900">
            <h2 class="text-2xl pb-3 font-semibold">
              Enter details of new patient
            </h2>
            <div>
              <div class="flex flex-col mb-3">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  required
                />
              </div>
              <div class="flex flex-col mb-3">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  required
                />
              </div>
              <div class="flex flex-col mb-3">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  required
                />
              </div>
              <div class="flex flex-col mb-3">
                <label for="message">Address</label>
                <textarea
                  rows="4"
                  id="message"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                ></textarea>
              </div>
            </div>
            <div class="w-full pt-3">
              <button
                type="submit"
                class="w-full bg-gray-900 border border-blue-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-blue-500 hover:text-white text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
