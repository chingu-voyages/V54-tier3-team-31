CREATE VIEW heatmap_statistics AS
SELECT
  user_id,
  DATE(completed_at) AS completion_date,
  COUNT(*) AS completed_tasks
FROM task
WHERE completed = TRUE AND completed_at IS NOT NULL
GROUP BY user_id, DATE(completed_at)
ORDER BY completion_date;
