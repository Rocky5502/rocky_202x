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

/**
 * Launch baseline:
 * Website displays baseline + real Firebase count.
 *
 * Example:
 * Firestore views = 10  → website shows 5,510 views
 * Firestore loves = 3   → website shows 803 loved
 */
const BASELINE_VIEWS = 5500;
const BASELINE_LOVES = 800;

export const SiteReactions = () => {
  const [views, setViews] = useState(0);
  const [loves, setLoves] = useState(0);
  const [loved, setLoved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeCounter = async () => {
      try {
        // Create document if missing, but never reset existing values.
        await setDoc(
          statsRef,
          {
            views: 0,
            loves: 0,
          },
          { merge: true }
        );

        const alreadyViewed = localStorage.getItem("rocky_home_viewed");

        // One real view per browser/device.
        if (!alreadyViewed) {
          await updateDoc(statsRef, {
            views: increment(1),
          });

          localStorage.setItem("rocky_home_viewed", "true");
        }

        if (mounted) {
          setLoved(localStorage.getItem("rocky_loved") === "true");
        }
      } catch (error) {
        console.error("Failed to initialize site counter:", error);
      }
    };

    initializeCounter();

    // Real-time Firebase listener.
    const unsubscribe = onSnapshot(
      statsRef,
      (snapshot) => {
        if (!mounted) return;

        if (snapshot.exists()) {
          const data = snapshot.data();

          setViews(Number(data.views || 0));
          setLoves(Number(data.loves || 0));
        }

        setReady(true);
      },
      (error) => {
        console.error("Failed to listen to site counter:", error);
        if (mounted) setReady(true);
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const handleLove = async () => {
    if (!ready || loved) return;

    try {
      await updateDoc(statsRef, {
        loves: increment(1),
      });

      setLoved(true);
      localStorage.setItem("rocky_loved", "true");
    } catch (error) {
      console.error("Failed to update love reaction:", error);
    }
  };

  const displayViews = BASELINE_VIEWS + views;
  const displayLoves = BASELINE_LOVES + loves;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
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
          "glass group flex items-center gap-2 rounded-full px-4 py-2 text-sm transition disabled:cursor-default",
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
