import { Expose } from "class-transformer";
import { IsArray, IsDefined, IsInt, IsOptional, IsString, Matches } from "class-validator";

class GameDTO {

 
  @IsOptional()
  @IsArray()
  @Expose()
  players_team_blue: string[];


  @IsOptional()
  @IsArray()
  @Expose()
  players_team_red: string[];

  @IsOptional()
  @IsString()
  @Expose()
  state: string;

};

export default GameDTO;
