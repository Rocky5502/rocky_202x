import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Eye, Heart } from "lucide-react";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const statsRef = doc(db, "siteStats", "homepage");

export const SiteReactions = () => {
  const [views, setViews] = useState<number>(0);
  const [loves, setLoves] = useState<number>(0);
  const [loved, setLoved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const snap = await getDoc(statsRef);

        if (!snap.exists()) {
          await setDoc(statsRef, { views: 1, loves: 0 });
          setViews(1);
          setLoves(0);
          localStorage.setItem("rocky_home_viewed", "true");
          setReady(true);
          return;
        }

        const data = snap.data();
        let currentViews = (data.views as number) || 0;
        const currentLoves = (data.loves as number) || 0;

        const alreadyViewed = localStorage.getItem("rocky_home_viewed");
        if (!alreadyViewed) {
          await updateDoc(statsRef, { views: increment(1) });
          currentViews += 1;
          localStorage.setItem("rocky_home_viewed", "true");
        }

        setViews(currentViews);
        setLoves(currentLoves);
        setLoved(localStorage.getItem("rocky_loved") === "true");
      } catch (err) {
        console.error("Failed to load site stats:", err);
      } finally {
        setReady(true);
      }
    };

    loadStats();
  }, []);

  const handleLove = async () => {
    if (loved) return;
    try {
      await updateDoc(statsRef, { loves: increment(1) });
      setLoves((prev) => prev + 1);
      setLoved(true);
      localStorage.setItem("rocky_loved", "true");
    } catch (err) {
      console.error("Failed to update love reaction:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/80">
        <Eye className="h-4 w-4 text-primary" />
        <span className="font-mono font-semibold">
          {ready ? views.toLocaleString() : "—"}
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
            : "text-foreground/80 hover:text-pink-400 hover:scale-[1.03]",
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition",
            loved ? "fill-pink-500 text-pink-500" : "group-hover:fill-pink-400/30",
          )}
        />
        <span className="font-mono font-semibold">
          {ready ? loves.toLocaleString() : "—"}
        </span>
        <span className="text-muted-foreground">
          {loved ? "loved" : "love"}
        </span>
      </button>
    </div>
  );
};

export default SiteReactions;
