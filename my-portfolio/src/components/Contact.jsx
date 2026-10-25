import React, { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaRegCopy,
} from "react-icons/fa";

function Contact({ personalData }) {
  const sectionRef = useRef(null);
  const formCardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error"

  // Reveal on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      if (window.innerHeight >= sectionRef.current.getBoundingClientRect().top) {
        setVisible(true);
        observer.disconnect();
      }
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Cursor-following spotlight on the form card
  const handleMouseMove = (e) => {
    const el = formCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setStatus("");
    try {
      const response = await fetch("https://portfolio-yash-s5gk.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMsg("Thank you for your message! I will get back to you soon.");
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setMsg("Oops! Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setMsg("Error sending message. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const reveal = (delay) => ({
    transitionDelay: visible ? `${delay}ms` : "0ms",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-4 sm:px-6 md:px-12 bg-gray-950 text-white"
    >
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 sm:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
              Get In Touch
              <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide font-mono">
                // let's build something together
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: info */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={reveal(100)}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's talk about your project
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Feel free to reach out if you're looking for a developer, have a
              question, or just want to connect.
            </p>

            <div className="space-y-4">
              <ContactItem
                icon={<FaEnvelope />}
                label="Email"
                value={personalData.email}
                href={`mailto:${personalData.email}`}
                copyable
              />
              <ContactItem
                icon={<FaPhone />}
                label="Phone"
                value={personalData.phone}
                href={`tel:${String(personalData.phone).replace(/\s/g, "")}`}
                copyable
              />
              <ContactItem
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={personalData.location}
              />
            </div>
          </div>

          {/* Right: form */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={reveal(220)}
          >
            <form
              ref={formCardRef}
              onMouseMove={handleMouseMove}
              onSubmit={handleSubmit}
              className="
                group/form relative overflow-hidden rounded-2xl
                bg-gray-900/50 border border-gray-800/70
                hover:border-blue-500/30
                p-5 sm:p-8
                transition-colors duration-500
              "
            >
              {/* Spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(96,165,250,0.10), rgba(192,132,252,0.05) 40%, transparent 70%)",
                }}
              />

              <div className="relative space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    id="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Field
                    id="email"
                    type="email"
                    label="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <Field
                  id="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />

                <Field
                  id="message"
                  label="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  textarea
                />

                {/* Success / failure message */}
                {msg && (
                  <p
                    className={`text-sm text-center rounded-lg px-4 py-2.5 border ${
                      status === "success"
                        ? "text-green-400 bg-green-500/10 border-green-500/20"
                        : "text-red-400 bg-red-500/10 border-red-500/20"
                    }`}
                  >
                    {msg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    group/btn w-full inline-flex items-center justify-center gap-3
                    px-6 py-3 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-blue-500 to-purple-500
                    hover:from-blue-400 hover:to-purple-400
                    shadow-[0_0_24px_rgba(96,165,250,0.25)]
                    transition-all duration-300
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <FaPaperPlane className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href, copyable }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="
        group/item flex items-center gap-4 p-4 rounded-xl
        bg-gray-900/50 border border-gray-800/70
        hover:border-blue-500/30 hover:bg-gray-900/80
        transition-all duration-300
      "
    >
      <div
        className="
          shrink-0 w-11 h-11 rounded-full flex items-center justify-center
          bg-blue-500/10 border border-blue-400/20 text-blue-400
          group-hover/item:text-purple-300 group-hover/item:border-purple-400/40
          transition-colors duration-300
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <p className="text-gray-200 text-sm sm:text-base truncate group-hover/item:text-white transition-colors">
          {value}
        </p>
      </div>

      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className="shrink-0 p-2 rounded-lg text-gray-500 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
        >
          {copied ? (
            <FaCheck className="h-4 w-4 text-green-400" />
          ) : (
            <FaRegCopy className="h-4 w-4" />
          )}
        </button>
      )}
    </Wrapper>
  );
}

function Field({ id, label, type = "text", value, onChange, textarea = false }) {
  const base = `
    peer w-full rounded-xl
    bg-gray-950/60 border border-gray-800
    px-4 pt-6 pb-2 text-sm text-white placeholder-transparent
    focus:outline-none focus:border-blue-400/60
    focus:shadow-[0_0_20px_rgba(59,130,246,0.12)]
    transition-all duration-300
  `;

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows="5"
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`${base} resize-none`}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={base}
          required
        />
      )}
      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-4 top-2
          font-mono text-[11px] text-gray-500
          transition-all duration-200
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-blue-400
        "
      >
        {label}
      </label>
    </div>
  );
}

export default Contact;