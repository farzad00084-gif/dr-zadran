# Content verification record

**Subject:** Dr. Khalid Khan Zadran  
**Review date:** 22 October 2026  
**Scope:** public facts, client-supplied details, and claims deliberately withheld from the website  
**Rule:** a claim is published only when it is either independently verified or explicitly supplied by the client and clearly treated as supplied. Layout gaps are never filled with invented content.

## Status key

| Status | Meaning |
| --- | --- |
| **Verified** | Checked against a durable public record or the official page linked below. |
| **Supplied** | Provided by the client for this project; not independently verified. Published only where necessary and with appropriate caution. |
| **Withheld** | Not published because evidence, approval, or confirmation is missing. |

## Identity and professional record

| Item | Published value | Status | Notes |
| --- | --- | --- | --- |
| Name | Dr. Khalid Khan Zadran | Supplied / corroborated | Consistent across the publication record and the official Facebook page. |
| Professional descriptor | Consultant Neurosurgeon · Brain & Spine Surgeon | Supplied / corroborated | Used as the site's professional descriptor. No specific hospital appointment or employment date is claimed. |
| Location | Kabul, Afghanistan | Supplied / corroborated | City and country only. No street address is published. |
| Credentials | MBBS, MD, RMP, MCPS, FCPS (Neurosurgery) | Supplied; FCPS corroborated | The FCPS neurosurgery qualification is corroborated by public professional records. MBBS, MD, RMP, and MCPS were supplied and were not independently re-verified for this build. |
| Clinic telephone | +93 78 765 4751 | Supplied | Displayed with a working `tel:+93787654751` link. The number was not independently called or verified. |
| Clinical affiliation | Rifah Medical Complex, Kabul, Afghanistan | Supplied | Not independently verified. No department, floor, street address, or hours are claimed. |
| Official Facebook page | `https://www.facebook.com/DrKhalidkhanzadran/` | Verified | Linked from the site as the official page. |
| LinkedIn | Public profile reviewed as supporting context | Verified as existing context | A public LinkedIn profile matching the name and professional role was reviewed during content research. It is not linked from the site. |
| Portrait | Designed placeholder marked “Portrait pending approval” | Withheld | No photograph of the doctor, or of any other person, is used. A real portrait requires the doctor's approval and a usable image file. |

## Editorial imagery

Four licensed editorial photographs are published as atmosphere and context: a historical Horsley-type skull saw (Wellcome Collection, CC BY 4.0), a CT neuroimaging sheet (National Cancer Institute / Unsplash License), a laboratory microscope (Yassine Khalfalli / Unsplash License), and an empty hospital corridor (Tasha Kostyuk / Unsplash License).

They are **not** photographs of Dr. Zadran, his clinic, his patients, or his own research. The hospital interior is explicitly captioned “not the clinic.” Full sources, licence links, and modification notes are in [IMAGE_CREDITS.md](./IMAGE_CREDITS.md). No identifiable patient or clinician is shown.

## Doctor-supplied imagery

Dr. Khalid Khan Zadran supplied five expertise-area images (neuronal organization, brain network paths, lumbar spine, neuroimaging sheets, and a surgical team), plus the hero and office portraits. They are locally generated from the supplied links and treated as **approved client-supplied imagery**; full files and processing details are in [IMAGE_CREDITS.md](./IMAGE_CREDITS.md).

## Verified publication

Only one publication was confidently attributed. It is the **only** item in `src/data/publications.js`.

> Tawhid MH, Rahimi HM, Nijrabi HB, Jawhar MS, Pirzad AF, Shekaib E, Sakhi R, Khurasani MH, Zadran KK. “Association between Brain Tumors and Head Injury: A Hospital-Based Case-Control Study in Afghanistan.” *Asian Journal of Neurosurgery*. 2025;20(2):344–349.

| Identifier | Value |
| --- | --- |
| DOI | `10.1055/s-0045-1805035` |
| PubMed | `40485786` |
| PMC | `PMC12136956` |
| Author position | Zadran KK is the final author |
| Verification date | 22 October 2026 |

Sources:

- DOI: https://doi.org/10.1055/s-0045-1805035
- PubMed: https://pubmed.ncbi.nlm.nih.gov/40485786/
- PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC12136956/

The publication summary and note in the translations are plain-language descriptions of the indexed record. They do not claim a clinical outcome, patient benefit, or a new treatment.

## Deliberately withheld or omitted claims

The following were **not** published. Absence is intentional, not an oversight:

- Any claim to be the “first neurosurgeon from Afghanistan” to hold FCPS or any other “first”/“only” distinction.
- Membership in surgical colleges, societies, boards, or fellowships beyond the supplied credentials, unless separately verified.
- Specific hospital appointments, employment dates, academic ranks, or training dates.
- Clinic street address, building/floor details, map coordinates, map embed, opening hours, appointment times, or walk-in policy.
- Email address, contact form, direct messaging, or a second telephone number.
- WhatsApp availability. The supplied number has **not** been confirmed as WhatsApp-enabled. The UI therefore shows “confirmation pending” and uses the telephone number as the fallback.
- A local emergency telephone number. The site instead directs visitors to the nearest appropriate emergency service.
- Patient testimonials, ratings, success rates, volumes, outcome statistics, waiting times, or cost information.
- Awards, media appearances, memberships, or academic publications other than the verified article above.
- A portrait, clinic photograph, or any stock image of a medical professional presented as the doctor.

## Disambiguation

**Dr. Khalid Khan Zadran** is a consultant neurosurgeon. He is **not** Khalid Zadran, the Kabul police spokesperson, and this site contains no police, security-spokesperson, or political content. Any future biography or press mention must preserve this distinction.

## Language review status

The English, Dari, and Pashto interfaces have matching key structures and localized page metadata. The Dari and Pashto translations were produced for this build but have **not yet been reviewed by a medical professional or a qualified medical translator**. Visible footer notices disclose this. Clinical terminology should be reviewed before launch.

## Approval and update workflow

1. Obtain a source URL, document, or dated confirmation for any new factual claim.
2. Record the item, status, source, and review date in this file.
3. Update `src/data/doctor.js`, `src/data/publications.js`, or the relevant translation file.
4. If the change affects a contact route, re-test the link and the WhatsApp gate.
5. Run `npm test`, `npm run lint`, and `npm run build`.
6. Re-check the prerendered metadata and sitemap after any new route or title.

### WhatsApp activation checklist

Only change `doctor.whatsapp.verified` to `true` after all of the following:

- The clinic confirms that the number receives WhatsApp messages.
- A real-device send/receive test succeeds.
- The greeting text and consent/privacy implications are approved.
- The WhatsApp button is checked for keyboard and screen-reader behavior.

## Privacy note

The site sets no analytics, advertising, or tracking cookies. Language preference is stored locally in the browser under `zadran-language`. Telephone and external links are direct links; no message content is collected by the site.
