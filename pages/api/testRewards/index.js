import { rewards } from '../../../testRewards'

export default function handler(req, res) {
  res.status(200).json(rewards)
}
