import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sponsors — TicoBlockchain 2026",
  description: "Patrocinadores de TicoBlockchain 2026",
};

export default function SponsorsPage() {
  return (
    <main id="main" className="pb-20">
      <section className="px-4 sm:px-6 md:px-12 bg-white py-24">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter text-primary mb-10 sm:mb-16 md:mb-20 animate-reveal-up">
          SPONSORS
        </h1>

        {/* Tier 01: Diamante */}
        <div className="mb-24 flex flex-col sm:flex-row border-t-4 border-primary pt-8 animate-fade-up stagger-1">
          <div className="sm:w-1/4 mb-6 sm:mb-0">
            <div className="text-6xl sm:text-8xl md:text-9xl font-headline font-black text-primary leading-none">
              01
            </div>
            <div className="font-headline font-bold text-2xl uppercase tracking-widest text-secondary mt-2">
              Diamante
            </div>
          </div>
          <div className="sm:w-3/4 flex flex-wrap gap-4">
            <div className="w-full md:flex-1 h-48 sm:h-56 md:h-64 bg-primary flex items-center justify-center p-12 group transition-all duration-300">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkJZ9VaDx_KIhnMN_Le5xXFoZ_UAJhuBD0YeC0acR4QzpbO6Pfj2R3zq68I_rqv8D2fFC6e99bJw3hx0WGoY_BssqEyZI-R2FMRTkmJNlbbjgX9mEX9yyF2w_CehoFdDzAXEpZGOSXRNijvw8EtC26FwqhF5h_im7dsX75rPaA0F0K9_lPfFWT9DxqQ1F8KywylYZ3pnfUg-gblob1EPetsl2ZRXOaC-WgkHbhC9L5j-chOWv4KVuwhx_qpUkJ9-eiwbuJPArrsM4"
                alt="Sponsor Diamante 1"
                width={400}
                height={200}
                sizes="(min-width: 768px) 37.5vw, (min-width: 640px) 75vw, 100vw"
                className="grayscale invert opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all w-full h-full object-contain"
              />
            </div>
            <div className="w-full md:flex-1 h-48 sm:h-56 md:h-64 bg-primary flex items-center justify-center p-12 group transition-all duration-300">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj8_goPazp3lkpiuKvrm2XRrdoz7PEgvbDvCTMOQZ2_eKciHXJpwIjt_u-9A1WWLkyIUYbKEgSnBziv4fsTq7TijbS8Rmg-_E7qX4ttv6uIvGN0d_mSdlP3YMAhf9cDRwE10_D1SCMHpS93tybkeVbs3Zs2vJNDqAQLx528c5XBrQWogm3tI3DCf3R9_sVbtKiEExHpS4Nd3BGG3JXINDekPToA7I3vJkQVtFytmDfCkAAyqWjP1wz8MUU9lJLOj20iUvPCeJ3KCk"
                alt="Sponsor Diamante 2"
                width={400}
                height={200}
                sizes="(min-width: 768px) 37.5vw, (min-width: 640px) 75vw, 100vw"
                className="grayscale invert opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Tier 02: Oro */}
        <div className="mb-24 flex flex-col sm:flex-row border-t-2 border-outline-variant pt-8 animate-fade-up stagger-3">
          <div className="sm:w-1/4 mb-6 sm:mb-0">
            <div className="text-5xl sm:text-7xl md:text-8xl font-headline font-black text-primary/40 leading-none">
              02
            </div>
            <div className="font-headline font-bold text-xl uppercase tracking-widest text-primary mt-2">
              Oro
            </div>
          </div>
          <div className="sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-32 sm:h-36 md:h-40 border-2 border-primary flex items-center justify-center p-8 bg-surface-container-low grayscale hover:grayscale-0 transition-all">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3ABrE9VRAZkqWSHsHJUJR1YYJn3eb5T6K9dHI4MvGzRJKdR9NNiAzzUedYZs2-Ckzy2_0xE4LNGn5K7p9oikJTufuiIRHFpoQClCrxNI-Zg3bVDhJJRchoFBVf-1YwHG9X0W1zhKDNvMgmuYODD6xvAn5PS1VqacihlzjcZD_BeHvwcgocOkMW-hrRvtdHt-3ufjfIVhPpYG2eaCuDovzdHhWNONXY57HOcKmnoJjDb2ekVfyN-tLIIbq1p0RINkv4oT0XkjpVi4"
                alt="Sponsor Oro 1"
                width={200}
                height={100}
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 37.5vw, 100vw"
                className="max-h-full object-contain"
              />
            </div>
            <div className="h-32 sm:h-36 md:h-40 border-2 border-primary flex items-center justify-center p-8 bg-surface-container-low grayscale hover:grayscale-0 transition-all">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEHdjptvzE1al-vpyRz8x0JEC2KPGaaAr0-2q1Ft_O0kym1_hnp-J4uwH6ek1s7i5FWczkAcq9G5AOd1HjqZz9se3t8hOWWKsUdfnZUnhtnnPqw7ohnKtS_ViTSZWvPTXBawG5kMQrbmA2jlzSAx-q6Jm9OesKmBfcuk1G2nFFaSsUQON2kDJeIyrkqoD3tUtEKEya43X6eyZs_mYYWUMWYSk3hJkgX-k4qtCGp-_V4jKNM9yVHGDTmNMk1kEkxsLgkx_zoG0M0Ao"
                alt="Sponsor Oro 2"
                width={200}
                height={100}
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 37.5vw, 100vw"
                className="max-h-full object-contain"
              />
            </div>
            <div className="h-32 sm:h-36 md:h-40 border-2 border-primary flex items-center justify-center p-8 bg-surface-container-low grayscale hover:grayscale-0 transition-all">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyyV7abHBtyaOLfbnEPNBX8C0-OEjtOf8A6Mw8qXBdZkCmjl9SQFFV9997yKn5lBTFtcHRbdotQxwRCu302xXEz5zCwdjBscqIUUvLbfpQzfVV1XkcIz__7QRpDCkqzW9XcyZ1zOU_Sh-jDfrdZmvAK7XCktl67PYHIksxFhvCDtFk0F6VZx-jYAPSMGcqe5hmWN_TSCYfpk3ifRP_mPXlIfnfWexYdV5_4y9Jvii01YBzME-oORJ72eQHvrUllkwbgdIX6WNBpjc"
                alt="Sponsor Oro 3"
                width={200}
                height={100}
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 37.5vw, 100vw"
                className="max-h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Tier 03: Plata */}
        <div className="flex flex-col sm:flex-row border-t-2 border-outline-variant pt-8 animate-fade-up stagger-5">
          <div className="sm:w-1/4 mb-6 sm:mb-0">
            <div className="text-4xl sm:text-6xl md:text-7xl font-headline font-black text-primary/20 leading-none">
              03
            </div>
            <div className="font-headline font-bold text-lg uppercase tracking-widest text-primary/60 mt-2">
              Plata
            </div>
          </div>
          <div className="sm:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {["PARTNER_01", "PARTNER_02", "PARTNER_03", "PARTNER_04", "PARTNER_05", "PARTNER_06"].map(
              (partner) => (
                <div
                  key={partner}
                  className="h-24 sm:h-28 md:h-32 bg-surface-container-lowest border border-outline-variant flex items-center justify-center p-6 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span className="mono-data text-xs font-bold uppercase tracking-tighter">
                    {partner}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
