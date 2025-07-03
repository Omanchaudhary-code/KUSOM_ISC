
import { motion } from 'framer-motion';
import { Trophy, Medal, Users, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const teams = [
  { name: 'AI Lawyer', status: 'winner' },
  { name: 'Profit.exe', status: 'runner-up' },
  { name: 'Acers', status: 'participant' },
  { name: 'BARULA', status: 'participant' },
  { name: 'Code2Convert (nec IT Club)', status: 'participant' },
  { name: 'Ctrl Freaks', status: 'participant' },
  { name: 'DevSquad', status: 'participant' },
  { name: 'Go-rizza', status: 'participant' },
  { name: 'Grow-Green', status: 'participant' },
  { name: 'Hack4change', status: 'participant' },
  { name: 'Null Pointer', status: 'participant' },
  { name: 'Spartans', status: 'participant' },
  { name: 'Syntax', status: 'participant' },
  { name: 'Team Megh', status: 'participant' },
  { name: 'Team Pacman', status: 'participant' },
  { name: 'Team Padmashree', status: 'participant' },
  { name: 'Team Stormers', status: 'participant' },
  { name: 'Team-7', status: 'participant' },
  { name: 'TryCatch Runners', status: 'participant' },
  { name: 'Unhandled Promise', status: 'participant' },
];

export default function HackathonParticipants() {
  const getTeamBadge = (status: string, name: string) => {
    switch (status) {
      case 'winner':
        return (
          <div className="flex items-center gap-2">
            <span className="font-semibold font-mono">{name}</span>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-yellow-300 shadow-md">
              <Trophy className="w-3 h-3 mr-1" />
              🥇 Winner
            </Badge>
          </div>
        );
      case 'runner-up':
        return (
          <div className="flex items-center gap-2">
            <span className="font-semibold font-mono">{name}</span>
            <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white border-purple-400 shadow-md">
              <Medal className="w-3 h-3 mr-1" />
              🥈 First Runner-Up
            </Badge>
          </div>
        );
      default:
        return <span className="font-mono">{name}</span>;
    }
  };

  const getRowClassName = (status: string) => {
    switch (status) {
      case 'winner':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-l-yellow-400 hover:from-yellow-100 hover:to-amber-100 transition-all duration-200';
      case 'runner-up':
        return 'bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-l-purple-400 hover:from-purple-100 hover:to-violet-100 transition-all duration-200';
      default:
        return 'hover:bg-gray-50/80 transition-all duration-200';
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 px-4 sm:px-6 lg:px-8 xl:px-12 relative overflow-hidden">
      {/* Background tech pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base font-medium text-isclub-teal bg-white/70 backdrop-blur-sm rounded-full border border-isclub-teal/20">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
            Hack for Business 2025
          </span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold text-isclub-navy leading-tight mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              lineHeight: 'clamp(1.75rem, 4.5vw, 3rem)'
            }}
          >
            🏆 Hackathon Participants
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
              lineHeight: 'clamp(1.375rem, 2vw, 1.75rem)'
            }}
          >
            Meet the 20 innovative teams who participated in our business hackathon, bringing creativity and cutting-edge solutions to real-world challenges.
          </motion.p>
        </motion.div>

        {/* Participants Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-isclub-teal/5 to-isclub-blue/5">
              <CardTitle className="flex items-center justify-center gap-2 text-xl sm:text-2xl text-isclub-navy font-mono">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                Participating Teams
              </CardTitle>
              <CardDescription className="text-gray-600 font-mono text-sm">
                20 teams • Hack for Business Event
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-gray-200 bg-gray-50/50">
                      <TableHead className="text-center font-bold text-isclub-navy text-base py-4 font-mono">
                        Team Rankings & Participants
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.map((team, index) => (
                      <motion.tr
                        key={team.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.03 }}
                        className={`${getRowClassName(team.status)} border-b border-gray-100`}
                      >
                        <TableCell className="text-center py-4 px-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-mono text-gray-500 min-w-[2rem]">
                              {String(index + 1).padStart(2, '0')}.
                            </span>
                            <div className="flex-1 flex justify-center">
                              {getTeamBadge(team.status, team.name)}
                            </div>
                            <div className="min-w-[2rem]"></div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-isclub-teal/10 via-isclub-cyan/10 to-isclub-blue/10 border-2 border-isclub-teal/20 shadow-lg rounded-2xl">
            <CardContent className="text-center py-8 px-6">
              <div className="mb-4">
                <Sparkles className="w-8 h-8 mx-auto text-isclub-teal mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-isclub-navy mb-4 font-mono">
                  🎉 Kudos to All Teams!
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base lg:text-lg">
                Your innovation and passion were inspiring throughout the <strong className="text-isclub-teal">Hack for Business</strong> event. 
                Even if you didn't take home the trophy this time, you've already won experience and impact. 
                Keep building, keep solving, and see you at the next hackathon!
                <span className="font-semibold text-isclub-teal"> 💪🚀</span>
              </p>
              <div className="mt-6 flex justify-center">
                <Badge variant="outline" className="bg-white/50 text-isclub-navy border-isclub-teal/30 px-4 py-2 text-sm font-mono">
                  Next hackathon loading... 🔄
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
