# Publication provenance and release checklist
**Maintained:** 12 October 2026 · **Identity:** [Chandan Kumar Sah / Rocky 文浩, ORCID 0009-0002-4017-7970](https://orcid.org/0009-0002-4017-7970)

This is a research website, not an automated citation scraper. **Never import a paper solely because the author has the same name** and **never treat host-conference grades as workshop or doctoral-track paper grades**. Check the exact publisher record, byline, track, DOI, and publication status before an update.

## Primary-source checks made during the October 2026 audit

| Record | Source | Verified detail | Status on site |
| --- | --- | --- | --- |
| Beyond Self-Knowledge (2026) | [arXiv:2607.25600](https://arxiv.org/abs/2607.25600) | Authors **Chandan Kumar Sah; Li Zhang; Xiaoli Lian**, in that exact order | Preprint; corrected author order |
| Beyond "What to Retrieve" (2026) | [arXiv:2607.24884](https://arxiv.org/abs/2607.24884) | Authors **Chandan Kumar Sah; Li Zhang; Xiaoli Lian**, in that exact order | Preprint; corrected author order |
| FairEval (2025) | [arXiv:2504.07801](https://arxiv.org/abs/2504.07801) | Authors Chandan Kumar Sah; Xiaoli Lian; Tony Xu; Li Zhang | Preprint; no claimed conference acceptance |
| PerFairX (2025) | [CVF ICCV 2025 workshop proceedings](https://openaccess.thecvf.com/ICCV2025_workshops/MCL) | Publisher byline **Chandan Kumar Sah; Xiaoli Lian**; pages 2771–2780 | ICCV **workshop** proceedings, not ICCV main conference |
| SafeRoute (2025) | [CVF ICCV 2025 workshop proceedings](https://openaccess.thecvf.com/ICCV2025_workshops/WDFM-AD) | Nine named authors including Chandan Kumar Sah second; pages 4606–4615 | ICCV **workshop** proceedings |
| CleanMAP (2025) | [CVF CVPR 2025 workshop proceedings](https://www.openaccess.thecvf.com/CVPR2025_workshops/WDFM-AD) | Eight named authors including Chandan Kumar Sah fourth; pages 3837–3846 | CVPR **workshop** proceedings |
| Fairness Evaluation in LLM-Based Educational Recommender Systems (2026) | [IntechOpen publisher page](https://www.intechopen.com/chapters/1230310) | Authors Chandan Kumar Sah; Xiaoli Lian; Tony Xu; Li Zhang; published 17 Feb 2026; DOI **10.5772/intechopen.1012999** | Peer-reviewed book chapter |

**Important disambiguation:** A PerFairX arXiv record can carry different metadata than the final CVF workshop proceedings. The website cites the **published CVF version**, therefore the CVF publisher byline is authoritative for that entry.

## Records needing later publisher follow-up

- **Auditable Uncertainty Control for Secure LLM Agents** — CCS 2026: conference acceptance and sole authorship **reported by the researcher**. Do not publish a made-up DOI or ACM proceedings URL. Once available, replace the event link with the ACM Digital Library paper record, verify the author and exact track, and update the status.
- **Uncertainty and Fairness Awareness in LLM-Based Recommendation Systems** — IASEAI 2026: the [AAAI OJS link](https://ojs.aaai.org/index.php/IASEAI/article/view/43060) was not programmatically accessible during this audit. Recheck the official publisher metadata before changing any record.
- **Understanding Uncertainty in LLMs** (ASE doctoral symposium), **Navigating the AI Frontier** (CSEE&T 2024), and **RUL Forecasting for Wind Turbine Predictive Maintenance** (Heliyon) — some primary publisher pages restricted automated access. Keep publication type and existing links without inventing details until independently checked.
- **Unveiling Bias in Fairness Evaluations of LLMs** — recheck the actual journal/publisher record and the Zenodo item independently before assigning additional publication metrics.

## Publication update protocol

1. Confirm ORCID affiliation and exact full author list in the primary publication record.
2. Record **version** (preprint, peer-reviewed journal, peer-reviewed workshop, full conference, book chapter, or accepted/forthcoming) and author order.
3. Verify **publisher or repository URL**. Do not invent a DOI, volume, impact factor, or acceptance status.
4. Venue ranks describe the **host venue** only. A workshop/doctoral symposium paper does not inherit the ranking of the main technical program.
5. Update `src/data/portfolio.ts`, the focused tests in `src/test/portfolio.test.ts`, and this file; run the full Pages verification gate before release.
