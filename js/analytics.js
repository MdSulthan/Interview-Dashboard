// Analytics Module - Career Readiness Score & Metrics
const Analytics = {
  // Calculate overall career readiness score
  calculateReadiness() {
    const goals = Storage.getGoals();
    const skills = Storage.getSkills();
    const interviews = Storage.getInterviews();
    const offers = Storage.getOffers();

    // Goals score: based on completion percentage
    let goalsScore = 0;
    if (goals.length > 0) {
      const totalProgress = goals.reduce((sum, g) => sum + (g.progress || 0), 0);
      const achievedBonus = goals.filter(g => g.column === 'achieved').length * 20;
      goalsScore = Math.min(100, Math.round(totalProgress / goals.length) + Math.min(achievedBonus, 30));
    }

    // Skills score: based on skill stages and readiness
    let skillsScore = 0;
    if (skills.length > 0) {
      const stageWeights = {
        'not-started': 0,
        'learning': 20,
        'practicing': 50,
        'interview-ready': 80,
        'mastered': 100
      };
      const totalSkillScore = skills.reduce((sum, s) => {
        const stageScore = stageWeights[s.column] || 0;
        const readiness = ((s.knowledgeScore || 0) + (s.practiceScore || 0) + (s.confidenceScore || 0)) / 3;
        return sum + (stageScore * 0.6 + readiness * 0.4);
      }, 0);
      skillsScore = Math.round(totalSkillScore / skills.length);
    }

    // Interviews score: based on progression through pipeline
    let interviewsScore = 0;
    if (interviews.length > 0) {
      const stageWeights = {
        'target': 5,
        'applied': 15,
        'hr-screening': 30,
        'technical-1': 45,
        'technical-2': 60,
        'manager': 75,
        'final': 85,
        'selected': 100,
        'rejected': 10
      };
      const totalInterviewScore = interviews.reduce((sum, i) => sum + (stageWeights[i.column] || 0), 0);
      interviewsScore = Math.round(totalInterviewScore / interviews.length);
    }

    // Offers score: based on offer stage
    let offersScore = 0;
    if (offers.length > 0) {
      const stageWeights = {
        'verbal': 40,
        'written': 60,
        'negotiating': 75,
        'accepted': 100,
        'declined': 20
      };
      const totalOfferScore = offers.reduce((sum, o) => sum + (stageWeights[o.column] || 0), 0);
      offersScore = Math.round(totalOfferScore / offers.length);
    }

    // Overall: weighted average
    const weights = { goals: 0.2, skills: 0.3, interviews: 0.3, offers: 0.2 };
    const hasData = goals.length > 0 || skills.length > 0 || interviews.length > 0 || offers.length > 0;

    let total = 0;
    if (hasData) {
      let totalWeight = 0;
      if (goals.length > 0) { total += goalsScore * weights.goals; totalWeight += weights.goals; }
      if (skills.length > 0) { total += skillsScore * weights.skills; totalWeight += weights.skills; }
      if (interviews.length > 0) { total += interviewsScore * weights.interviews; totalWeight += weights.interviews; }
      if (offers.length > 0) { total += offersScore * weights.offers; totalWeight += weights.offers; }
      total = totalWeight > 0 ? Math.round(total / totalWeight) : 0;
    }

    return {
      total,
      goals: goalsScore,
      skills: skillsScore,
      interviews: interviewsScore,
      offers: offersScore
    };
  },

  // Get activity summary
  getActivitySummary() {
    const goals = Storage.getGoals();
    const skills = Storage.getSkills();
    const interviews = Storage.getInterviews();
    const offers = Storage.getOffers();

    return {
      totalGoals: goals.length,
      activeGoals: goals.filter(g => g.column !== 'achieved').length,
      completedGoals: goals.filter(g => g.column === 'achieved').length,
      totalSkills: skills.length,
      skillsLearning: skills.filter(s => s.column === 'learning').length,
      skillsPracticing: skills.filter(s => s.column === 'practicing').length,
      skillsReady: skills.filter(s => s.column === 'interview-ready').length,
      skillsMastered: skills.filter(s => s.column === 'mastered').length,
      totalApplications: interviews.length,
      activeInterviews: interviews.filter(i => !['target', 'selected', 'rejected'].includes(i.column)).length,
      selected: interviews.filter(i => i.column === 'selected').length,
      rejected: interviews.filter(i => i.column === 'rejected').length,
      totalOffers: offers.length,
      acceptedOffers: offers.filter(o => o.column === 'accepted').length
    };
  }
};
