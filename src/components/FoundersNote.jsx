import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Gold ornament divider ─────────────────────────────────── */
const GoldRule = () => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    <span className="text-gold-500 text-xs tracking-[0.35em]">✦ ✦ ✦</span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
  </div>
)

/* ── Signature placeholder ─────────────────────────────────── */
const SignaturePlaceholder = ({ src }) =>
  src ? (
    <img
      src={src}
      alt="Habiba's signature"
      className="h-16 object-contain print:h-14"
    />
  ) : (
    <div className="flex flex-col items-start gap-1">
      {/* hand-drawn cursive SVG placeholder */}
      <svg
        viewBox="0 0 220 60"
        className="h-14 w-auto opacity-70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 45 C30 15, 50 5, 70 25 C85 40, 95 10, 115 20
             C130 30, 140 8, 160 18 C175 26, 185 15, 210 22"
          stroke="#BF9920"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 50 C40 48, 80 52, 120 49 C155 46, 185 50, 208 47"
          stroke="#BF9920"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
      <p className="text-[11px] font-sans tracking-[0.2em] text-gold-600 uppercase">
        Replace with actual signature image
      </p>
    </div>
  )

/* ═══════════════════════════════════════════════════════════════
   FoundersNote — the reusable modal component
   Props:
     isOpen       boolean  — controls visibility
     onClose      fn       — called when backdrop or × is clicked
     signatureSrc string   — optional URL for signature image
═══════════════════════════════════════════════════════════════ */
export default function FoundersNote({ isOpen, onClose, signatureSrc }) {
  const printRef = useRef(null)

  const handlePrint = () => {
    const card = printRef.current
    if (!card) return

    const printWindow = window.open('', '_blank', 'width=900,height=700')
    // collect all <link rel="stylesheet"> and <style> tags from the parent page
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((el) => el.outerHTML)
      .join('\n')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Founder's Note — Habiba Salon</title>
          ${styles}
          <style>
            body { margin: 0; padding: 0; background: white; }
            .print\\:hidden { display: none !important; }
          </style>
        </head>
        <body>${card.outerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    // slight delay to let fonts/styles load before printing
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ──────────────────────────────────────── */
        <motion.div
          className="modal-backdrop fixed inset-0 z-50 overflow-y-auto
                     bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="founders-note-heading"
        >
          {/* ── Centering wrapper — lets card scroll on short viewports ── */}
          <div className="min-h-full flex items-center justify-center p-4 sm:p-8">

          {/* ── Card — stops propagation so click inside doesn't close ── */}
          <motion.div
            ref={printRef}
            className="modal-card relative w-full max-w-2xl rounded-2xl overflow-hidden
                       shadow-[0_32px_80px_rgba(0,0,0,0.28)]"
            style={{ background: '#FFFDF5' }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Gold top bar ───────────────────────────────── */}
            <div className="h-1.5 w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

            {/* ── Inner gold border frame ─────────────────────── */}
            <div className="m-5 rounded-xl border border-gold-500/30 p-8 sm:p-10">

              {/* Close button */}
              <button
                onClick={onClose}
                className="print:hidden absolute top-8 right-8 w-9 h-9 flex items-center
                           justify-center rounded-full text-gold-600 hover:bg-gold-100
                           transition-colors text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>

              {/* Eyebrow */}
              <p className="font-sans text-[11px] font-700 tracking-[0.35em] uppercase
                            text-gold-500 mb-3">
                Habiba Salon &nbsp;·&nbsp; Hafizabad
              </p>

              {/* Heading */}
              <h2
                id="founders-note-heading"
                className="font-serif text-3xl sm:text-4xl font-black leading-tight
                           text-gray-900 mb-1"
              >
                A Message from Habiba
              </h2>
              <p className="font-serif italic text-gold-500 text-lg mb-1">
                Founder &amp; Head Beautician
              </p>

              <GoldRule />

              {/* Body copy */}
              <div className="font-sans text-[15px] leading-relaxed text-gray-700 space-y-4">
                <p>
                  Ramadan Mubarak to each and every one of you. 🌙
                </p>
                <p>
                  This blessed month has always felt like the right time to give
                  back — to the women of Hafizabad who have trusted us with their
                  care, their celebrations, and their most important moments.
                </p>
                <p>
                  We have put together these seven deals with a single thought in
                  mind: that every woman deserves to feel radiant, especially
                  during Ramadan. Whether you are preparing for Eid or simply
                  treating yourself after a long fast, our team is here to make
                  sure you leave feeling your very best.
                </p>
                <p>
                  Walk in whenever you feel ready. There is no booking required —
                  just come as you are, and we will take care of the rest.
                </p>
                <p className="font-serif italic text-gray-600">
                  With warmth and gratitude,
                </p>
              </div>

              <GoldRule />

              {/* Signature row */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  <SignaturePlaceholder src={signatureSrc} />
                  <p className="mt-3 font-serif font-bold text-gray-900 text-lg">Habiba</p>
                  <p className="font-sans text-[12px] tracking-widest uppercase text-gold-600">
                    Founder, Habiba Salon
                  </p>
                </div>

                {/* Validity badge */}
                <div className="text-right print:hidden">
                  <span className="inline-block border border-gold-400/50 rounded px-4 py-2
                                   font-sans text-[11px] tracking-[0.2em] uppercase text-gold-600
                                   bg-gold-50">
                    Valid Throughout Ramadan 2026
                  </span>
                </div>
              </div>

              {/* Print button */}
              <div className="mt-8 flex justify-end print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg
                             bg-gold-500 hover:bg-gold-600 active:bg-gold-700
                             text-white font-sans text-sm font-bold tracking-wide
                             transition-colors shadow-md shadow-gold-500/25"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415
                         42.415 0 0 1 10.56 0m-10.56 0L6.75 19.817m10.56-5.988
                         c.24.03.48.062.72.096m-.72-.096L17.25 19.817M7.5
                         10.5h.008v.008H7.5V10.5Zm9 0h.008v.008H16.5V10.5Z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.75 6h10.5A2.25 2.25 0 0 1 19.5 8.25v7.5A2.25 2.25
                         0 0 1 17.25 18H6.75A2.25 2.25 0 0 1 4.5 15.75v-7.5A2.25
                         2.25 0 0 1 6.75 6Z" />
                  </svg>
                  Print to PDF
                </button>
              </div>
            </div>

            {/* ── Gold bottom bar ─────────────────────────────── */}
            <div className="h-1.5 w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
          </motion.div>
          </div>{/* end centering wrapper */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
