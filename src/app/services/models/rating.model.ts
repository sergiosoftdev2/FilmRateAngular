export class Rating {
  constructor(
    public user_id: string = '',
    public movie_id: string = '',
    public movie_poster: string = '',
    public critic: string = '',
    public rating: number = 0,
  ) {}
}