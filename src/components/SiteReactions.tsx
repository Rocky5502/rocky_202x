import { useEffect, useState } from "react";
import {
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Eye, Heart } from "lucide-react";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const statsRef = doc(db, "siteStats", "homepage");

// Change these if you want a launch baseline.
// Set both to 0 if you want only real Firebase numbers.
const BASELINE_VIEWS = 5500;
const BASELINE_LOVES = 800;

export const SiteReactions = () => {
  const [views, setViews] = useState(0);
  const [loves, setLoves] = useState(0);
  const [loved, setLoved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initStats = async () => {
      try {
        await setDoc(
          statsRef,
          {
            views: 0,
            loves: 0,
          },
          { merge: true }
        );

        const alreadyViewed = localStorage.getItem("rocky_home_viewed");

        if (!alreadyViewed) {
          await updateDoc(statsRef, {
            views: increment(1),
          });

          localStorage.setItem("rocky_home_viewed", "true");
        }

        setLoved(localStorage.getItem("rocky_loved") === "true");
      } catch (err) {
        console.error("Failed to initialize site stats:", err);
      }
    };

    initStats();

    const unsubscribe = onSnapshot(
      statsRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setViews((data.views as number) || 0);
          setLoves((data.loves as number) || 0);
        }

        setReady(true);
      },
      (err) => {
        console.error("Failed to listen to site stats:", err);
        setReady(true);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLove = async () => {
    if (loved || !ready) return;

    try {
      await updateDoc(statsRef, {
        loves: increment(1),
      });

      setLoved(true);
      localStorage.setItem("rocky_loved", "true");
    } catch (err) {
      console.error("Failed to update love reaction:", err);
    }
  };

  const displayViews = BASELINE_VIEWS + views;
  const displayLoves = BASELINE_LOVES + loves;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/80 transition hover:scale-[1.03]">
        <Eye className="h-4 w-4 text-primary" />

        <span className="font-mono font-semibold">
          {ready ? displayViews.toLocaleString() : "—"}
        </span>

        <span className="text-muted-foreground">views</span>
      </div>

      <button
        type="button"
        onClick={handleLove}
        disabled={!ready || loved}
        aria-pressed={loved}
        className={cn(
          "glass group flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
          loved
            ? "text-pink-400"
            : "text-foreground/80 hover:scale-[1.03] hover:text-pink-400"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition",
            loved
              ? "fill-pink-500 text-pink-500"
              : "group-hover:fill-pink-400/30"
          )}
        />

        <span className="font-mono font-semibold">
          {ready ? displayLoves.toLocaleString() : "—"}
        </span>

        <span className="text-muted-foreground">
          {loved ? "loved" : "love"}
        </span>
      </button>
    </div>
  );
};

export default SiteReactions;
