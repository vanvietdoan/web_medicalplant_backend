import { Service } from 'typedi';
import { IEvalue } from "../interfaces/IEvalue";
import logger from "../utils/logger";
import { Evalue } from '../entities/Evalue';
import { EvalueRepository } from '../repositories/EvalueRepository';
import { IAdviceComment } from '../interfaces/IAdviceComment';

@Service()
export class EvalueService {
  constructor(
    private evalueRepository: EvalueRepository
  ) {}

  private host: string = '';

  public setHost(host: string) {
    logger.info(`Setting host in EvalueService: ${host}`);
    this.host = host;
  }

  private mapEvalueResponse(evalue: Evalue): IEvalue {
    return {
      id: evalue.id,
      rating: evalue.rating,
      content: evalue.content,
      advice_id: evalue.advice_id,
      user_id: evalue.user_id,
      created_at: evalue.created_at,
      updated_at: evalue.updated_at,
      user: evalue.user ? {
        user_id: evalue.user_id,
        created_at: evalue.user.created_at,
        full_name: evalue.user.full_name,
        proof: evalue.user.proof
      } : {
        user_id: evalue.user_id,
        created_at: null,
        full_name: null,
        proof: null
      }
    };
  }

  public async findAll(): Promise<IEvalue[]> {
    const evalues = await this.evalueRepository.findAll();
    return evalues.map(evalue => this.mapEvalueResponse(evalue));
  }

  public async findById(id: number): Promise<IEvalue | null> {
    const evalue = await this.evalueRepository.findById(id);
    if (!evalue) return null;
    return this.mapEvalueResponse(evalue);
  }

  public async create(evalueData: Partial<IEvalue>): Promise<IEvalue> {
    const evalue = await this.evalueRepository.create(evalueData);
    return this.mapEvalueResponse(evalue);
  }

  public async updateEvalue(id: number, evalueData: Partial<IEvalue>): Promise<IEvalue | null> {
    const updatedEvalue = await this.evalueRepository.update(id, evalueData);
    if (!updatedEvalue) return null;
    return this.mapEvalueResponse(updatedEvalue);
  }

  public async delete(id: number): Promise<boolean> {
    return this.evalueRepository.delete(id);
  }

  public async getbyUserId(userId: number): Promise<IEvalue[]> {
    if (!this.host) {
      logger.warn('Host is not set when calling getbyUserId');
    }
    const evalues = await this.evalueRepository.findByUserId(userId);
    return evalues.map(evalue => this.mapEvalueResponse(evalue));
  }

  public async getbyAdviceId(adviceId: number): Promise<IEvalue[]> {
    if (!this.host) {
      logger.warn('Host is not set when calling getbyAdviceId');
    }
    const evalues = await this.evalueRepository.findByAdviceId(adviceId);
    return evalues.map(evalue => this.mapEvalueResponse(evalue));
  }
}