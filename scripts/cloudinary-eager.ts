/**
 * Pre-generates (eager) every derived video and poster the site uses, so the
 * first visitor never waits for Cloudinary to transcode a 4K clip.
 *
 *   npx tsx scripts/cloudinary-eager.ts          # print what would be generated
 *   npx tsx scripts/cloudinary-eager.ts --run    # generate (needs API key/secret)
 *
 * Env: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
 * Re-run after changing a transformation in lib/cloudinary.ts or adding a video to lib/media.ts.
 */
import { createHash } from "node:crypto";
import {
  CLOUDINARY_CLOUD_NAME,
  FILM_TX,
  HERO_MEDIA,
  HERO_TX,
  LOOP_POSTER_TX,
  filmPosterTx,
} from "../lib/cloudinary";
import { LOOPS, VIDEOS, loopTransform, video, videoPublicId } from "../lib/media";

type Job = { publicId: string; eager: string[] };

function eagerJobs(): Job[] {
  const jobs = new Map<string, Set<string>>();
  const add = (publicId: string, ...tx: string[]) => {
    const set = jobs.get(publicId) ?? new Set<string>();
    tx.forEach((t) => set.add(t));
    jobs.set(publicId, set);
  };

  add(
    HERO_MEDIA.base,
    `${HERO_TX.wide}/mp4`,
    `${HERO_TX.tall}/mp4`,
    `${HERO_TX.widePoster}/jpg`,
    `${HERO_TX.tallPoster}/jpg`,
  );

  for (const v of VIDEOS) {
    add(videoPublicId(v), `${FILM_TX}/mp4`, `${filmPosterTx(v.posterAt)}/jpg`);
  }

  for (const spec of Object.values(LOOPS)) {
    add(videoPublicId(video(spec.slug)), `${loopTransform(spec)}/mp4`, `${LOOP_POSTER_TX}/jpg`);
  }

  return [...jobs].map(([publicId, eager]) => ({ publicId, eager: [...eager] }));
}

async function run(job: Job) {
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!key || !secret) throw new Error("Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET");

  const params: Record<string, string> = {
    eager: job.eager.join("|"),
    eager_async: "true",
    public_id: job.publicId,
    timestamp: String(Math.floor(Date.now() / 1000)),
    type: "upload",
  };
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const signature = createHash("sha1").update(toSign + secret).digest("hex");

  const body = new URLSearchParams({ ...params, api_key: key, signature });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/explicit`, {
    method: "POST",
    body,
  });
  if (!res.ok) throw new Error(`${job.publicId}: ${res.status} ${await res.text()}`);
  console.log("queued", job.publicId);
}

async function main() {
  const jobs = eagerJobs();
  if (process.argv.includes("--run")) {
    for (const job of jobs) await run(job);
  } else {
    console.log(JSON.stringify(jobs, null, 2));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
