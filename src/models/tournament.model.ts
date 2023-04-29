import { Expose } from "class-transformer";
import { IsArray, IsDefined, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import Game from "./game.model";

class Tournament {
  @IsOptional()
  @IsString()
  @Expose()
  @Matches(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
  )
  id : string;

  @IsOptional()
  @IsString()
  @Expose()
  start_date: string;

  @Expose()
  @IsArray()
  @IsOptional()
  games: Game[]


  @IsOptional()
  @IsNumber()
  @Expose()
  times_per_match: number;

  @IsOptional()
  @IsString()
  @Expose()
  goals_per_match: number;


};

export default Tournament;
