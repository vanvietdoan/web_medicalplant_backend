import { Service } from 'typedi';
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { ILike } from "typeorm";
import { IUser, IUserDTO } from "../interfaces/IUser";
import { IEvalue } from "../interfaces/IEvalue";
import { Evalue } from '../entities/Evalue';

@Service()
export class EvalueRepository    {
  private evalueRepository = AppDataSource.getRepository(Evalue);

  public async findAll(): Promise<Evalue[]> {
    return this.evalueRepository.find({
      relations: ['user', 'advice']
    });
  }
  public async findById(id: number): Promise<Evalue | null> {
    return this.evalueRepository.findOne({
      where: { id: id },
      relations: ['user', 'advice']
    });
  }

  public async findByUserId(userId: number): Promise<Evalue[]> {
    return this.evalueRepository.find({
      where: { user_id: userId },
      relations: [ 'user']
    });
  }

  public async findByAdviceId(adviceId: number): Promise<Evalue[]> {
    return this.evalueRepository.find({
      where: { advice_id: adviceId },
      relations: ['advice']
    });
  }


  public async create(evalueData: Partial<IEvalue>): Promise<Evalue> {
    const evalue = this.evalueRepository.create(evalueData as Evalue);
    return this.evalueRepository.save(evalue);
  }

  public async update(id: number, evalueData: Partial<IEvalue>): Promise<Evalue | null> {
    await this.evalueRepository.update(id, evalueData as Evalue);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.evalueRepository.delete(id);
    return result.affected !== 0;
  }

} 