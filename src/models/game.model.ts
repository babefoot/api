import { Expose } from "class-transformer";
import { IsArray, IsDefined, IsInt, IsOptional, IsString, Matches } from "class-validator";
import Player from "./player.model";

class Game {

 
  @IsOptional()
  @IsString()
  @Expose()
  @Matches(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
  )
  id: string;

  @IsDefined()
  @IsInt()
  @Expose()
  nb_player: number;


  @IsOptional()
  @IsString()
  @Expose()
  date: string;

  @IsOptional()
  @IsInt()
  @Expose()
  duration: number;

  @IsOptional() 
  @IsString()
  @Expose()
  state: string;

  @IsOptional()
  @IsInt()
  @Expose()
  score_team_red: number;

  @IsOptional()
  @IsInt()
  @Expose()
  score_team_blue: number;

  @IsOptional()
  @IsInt()
  @Expose()
  round: number;

  @IsOptional() 
  @IsInt()
  @Expose()
  order: number;

  @IsOptional()
  @IsArray()
  @Expose()
  players: Player[];

  @IsOptional() 
  @IsString()
  @Expose()
  fk_tournament: string;
};

export default Game;
