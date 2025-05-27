import { Candidate } from "./candidate.model";
import { Skill } from "./skill.model";

export interface CandidateSkill {
    id: number;
    candidateId: number;
    skillId: number;
    Candidate?: Candidate;
    Skill?: Skill;
}