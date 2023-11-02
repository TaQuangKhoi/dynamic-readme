import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import * as config from '../../../config.json';
import { GameboyService } from './gameboy.service';

@Controller('gameboy')
export class GameboyController {

  constructor(private gameboyService: GameboyService){}

  @Get('/input')
  input(@Query('input') input: string, @Res() res: Response) {
    if(input) this.gameboyService.input(input)
    res.status(200)
    res.redirect(config.datas.repo.url + '#github-plays-pokemon-')
  }

  @Get('/save')
  save(@Res() res: Response) {
    return this.gameboyService.save(res)
  }

  @Post('/load')
  load(@Body() save) {
    this.gameboyService.load(save)
  }

  @Get('/doframe')
  frame(@Res() res: Response) {
    return this.gameboyService.frame(res)
  }

  @Get('/dogif')
  gif(@Res() res: Response) {
    if(!this.gameboyService.lastInputFrames.length) return this.gameboyService.frame(res)
    return this.gameboyService.gif(res)
  }
}
