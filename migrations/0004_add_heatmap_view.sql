CREATE VIEW heatmap_statistics AS
SELECT 
  user_id,
  DATE(updated_at) AS date,
  COUNT(*) AS count
FROM task
WHERE completed = true
GROUP BY user_id, DATE(updated_at)
ORDER BY user_id, DATE(updated_at);
