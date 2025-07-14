"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    trigger,
  } = useForm({ mode: "onChange" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    let timer;
    if (submitSuccess) {
      timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [submitSuccess]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append("access_key", "a5a7c1e2-c7ec-444b-8f99-898094447c0b");
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("subject", data.subject);
    formData.append("message", data.message || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error(
          result.message || "Failed to submit form. Please try again later."
        );
    }
} catch (error){
    setSubmitError(
        error.message ? error instanceof Error :"An error occured"
    );
}
finally{
    setIsSubmitting(false);
}
};

return (
  <>
<div className="relative min-h-screen p-4">
  <div className="fixed inset-0 -z-10">
    <img
      src="./thumb-1920-585646.png"
      alt="interstellar"
      className="w-full h-full object-cover opacity-20"
    />
  </div>
 
  <h1 className="text-5xl text-white text-center font-bold py-6 drop-shadow-lg">
    Interstellar
  </h1>

  <div className="flex justify-center">
    <div className="w-[640px] max-w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <video
      controls
        autoPlay 
        muted
        loop
        className="w-full h-auto"
        poster="fallback-image.jpg"
      >
        <source
          src="./clideo_editor_cec0dfb4721e45a48639ccbddd0ce948.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>

  <p className="text-center text-lg text-white mt-8 leading-relaxed px-4 sm:px-20">
    🌽 <span className="font-semibold text-yellow-300">Real cornfields</span> were planted for the movie!<br />
    For the breathtaking Earth scenes — especially around Cooper's farmhouse — director
    <span className="font-semibold text-purple-300"> Christopher Nolan </span>
    avoided CGI and went all-in on realism.<br />
    🚜 He had <span className="font-semibold text-green-300">500 acres of real corn</span> planted in Alberta, Canada, just for the shoot.<br /><br />
    🎬 Why go to such lengths?<br />
    Because Nolan wanted every frame to <span className="italic">feel real</span> — no shortcuts.<br />
    🌽 After filming, the team sold the corn and actually made a profit!<br /><br />
    💡 <span className="text-cyan-300 font-semibold">Smart filmmaking</span> meets <span className="text-orange-300 font-semibold">practical effects</span>.<br />
    That’s the Nolan signature.
  </p>
</div>

</>
)
}

