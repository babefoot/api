import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString, Matches } from "class-validator";

class Player {
  @IsOptional()
  @IsString()
  @Expose()
  @Matches(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
  )
  id : string;

  @IsDefined()
  @IsString()
  @Expose()
  firstname: string;

  @IsDefined()
  @IsString()
  @Expose()
  lastname: string;

  @IsOptional()
  @IsString()
  @Expose()
  nb_buts : number;

  @IsOptional()
  @IsString()
  @Expose()
  nb_matchs_won : number;

  @IsDefined()
  @IsString()
  @Expose()
  card_id: number;
};

export default Player;
