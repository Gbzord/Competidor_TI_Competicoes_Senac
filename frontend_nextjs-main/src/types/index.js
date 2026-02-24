/**
 * @typedef {Object} SkillScores
 * @property {number} logica
 * @property {number} frontend
 * @property {number} backend
 * @property {number} bancoDeDados
 * @property {number} softSkills
 * @property {number} devOps
 */

/**
 * @typedef {Object} Competitor
 * @property {string} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} occupation
 * @property {SkillScores} skills
 * @property {number} overallAverage
 * @property {number} evaluationCount
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} maxTime - minutes
 */

/**
 * @typedef {Object} Evaluation
 * @property {string} id
 * @property {string} competitorId
 * @property {string} taskId
 * @property {string} date
 * @property {SkillScores} scores
 * @property {number} timeSpent - minutes
 * @property {string} feedback
 * @property {string} evaluator
 */

/**
 * @typedef {Object} EvolutionPoint
 * @property {string} date
 * @property {number} average
 * @property {string} label
 */

/**
 * @typedef {'coach' | 'competitor'} Role
 */

export { };
