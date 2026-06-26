import {NewsRequestDto} from './news-request.dto';

export interface NewsProfileDto extends NewsRequestDto {
    id: number;
    userId: number;
}