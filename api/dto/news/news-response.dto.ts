import {NewsRequestDto, NewsUserDto} from '@/api/dto';

export interface NewsResponseDto extends NewsRequestDto {
    id: number;
    user: NewsUserDto;
}