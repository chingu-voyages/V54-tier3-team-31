import { Button } from "@/components/ui/button"
import { getHabits, getUsers } from "@/lib/queries/select"

export default async function Home() {
  const results = await Promise.allSettled([getUsers(), getHabits()]);
  const users = results[0].status === 'fulfilled' ? results[0].value : null;
  const ratings = results[1].status === 'fulfilled' ? results[1].value : null;
  console.log('users', users);
  console.log('ratings', ratings);

  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}