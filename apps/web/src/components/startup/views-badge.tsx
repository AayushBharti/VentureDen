import { Logger } from "@workspace/logger";
import { writeClient } from "@workspace/sanity/write-client";
import { after } from "next/server";

const logger = new Logger("views-badge");

/**
 * Server component that increments the view count on render.
 * Uses after() to atomically increment views without blocking render.
 * Renders nothing — the count is displayed in the floating stats bar.
 */
export function ViewsBadge({ id }: { id: string }) {
  after(async () => {
    try {
      await writeClient.patch(id).inc({ views: 1 }).commit();
    } catch (error) {
      logger.error("Failed to increment views", { id, error });
    }
  });

  return null;
}
