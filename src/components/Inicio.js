import React from 'react'

export const Inicio = () => {
  return (
    <>
 
          {/* COMIENZO HEADER */}
          <div class="hero min-h-screen bg-base-200 img-background">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-7xl font-bold text-white">Hello there</h1>

            <button class="btn btn-primary"><a href='#comienzo'></a>
              Comenzar</button>
          </div>
        </div>
      </div>
      {/* COMIENZO SOBRE NOSOTROS */}
      <div className='p-14'>
        <h2 className="mt-5  mb-3 p-3 font-serif text-center text-2xl text-black-600"> <strong> Nuestra Historia</strong></h2>
        <div className='flex justify-center'>
          {/* COMIENZO MODAL */}
          <a href="#my-modal-2" class="btn">ver detalles</a>

          <div class="modal" id="my-modal-2">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
              <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
              <div class="modal-action">
                <a href="#" class="btn">Yay!</a>
              </div>
            </div>
          </div>
        </div>

        <p className="p-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the like).</p>

        <div className='flex flex-col'>
          <ul class="steps steps-vertical xl:steps-horizontal">
            <li class="step step-primary">Register</li>
            <li class="step step-primary">Choose plan</li>
            <li class="step step-primary">Purchase</li>
            <li class="step">Receive Product</li>
            <li class="step">Purchase</li>
            <li class="step">Receive Product</li>

          </ul>
        </div>

      </div>
    </>
  )
}
