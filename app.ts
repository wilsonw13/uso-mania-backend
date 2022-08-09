/* import { express, NextFunction, Request, Response } from "express"; */
import { PrismaClient } from "@prisma/client";
import { count } from "console";
import fs from "fs";
/* const express = require("express");

const app = express();

app.get("/feed", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  res.json(posts);
});

app.post("/post", async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(post);
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  });
  res.json(post);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  res.json(user);
});

const server = app.listen(3000);
 */

const prisma = new PrismaClient();

async function log() {
  try {
    fs.writeFileSync(
      "logs/users.json",
      JSON.stringify(await prisma.user.findMany())
    );

    fs.writeFileSync(
      "logs/userSettings.json",
      JSON.stringify(await prisma.userSettings.findMany())
    );

    fs.writeFileSync(
      "logs/userStats.json",
      JSON.stringify(await prisma.userStats.findMany())
    );

    fs.writeFileSync(
      "logs/playedBeatmaps.json",
      JSON.stringify(await prisma.userPlayedBeatmap.findMany())
    );

    fs.writeFileSync(
      "logs/scoreEntries.json",
      JSON.stringify(await prisma.userScoreEntry.findMany())
    );
  } catch (e) {
    console.error(e.message);
  }
}

async function resetDatabase() {
  const deleteUsers = prisma.user.deleteMany();
  const deleteUserSettings = prisma.userSettings.deleteMany();
  const deleteUserStats = prisma.userStats.deleteMany();
  const deletePlayedBeatmaps = prisma.userPlayedBeatmap.deleteMany();
  const deleteUserScores = prisma.userScoreEntry.deleteMany();

  await prisma.$transaction([
    deleteUsers,
    deleteUserSettings,
    deleteUserStats,
    deletePlayedBeatmaps,
    deleteUserScores,
  ]);
}

async function createUser(id: string, givenUsername: string) {
  try {
    await prisma.user.create({
      data: {
        userId: id,
        username: givenUsername,
        settings: {
          create: {},
        },
        stats: {
          create: {},
        },
      },
    });
  } catch (e) {
    console.error(e.message);
  } finally {
    prisma.$disconnect;
  }
}

async function updateUser(
  id: string,
  userObj: {
    pfpId?: number | undefined;
    description?: string | undefined;
    characters?: string | undefined;

    volumeMaster?: number | undefined;
    volumeMusic?: number | undefined;
    volumeHitSound?: number | undefined;

    scrollSpeed?: number | undefined;

    keys1?: string | undefined;
    keys2?: string | undefined;
    keys3?: string | undefined;
    keys4?: string | undefined;
    keys5?: string | undefined;
    keys6?: string | undefined;
    keys7?: string | undefined;
    keys8?: string | undefined;
    keys9?: string | undefined;
  }
) {
  try {
    await prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        pfpId: userObj.pfpId,
        description: userObj.description,
        characters: userObj.characters,
        settings: {
          update: {
            volumeMaster: userObj.volumeMaster,
            volumeMusic: userObj.volumeMusic,
            volumeHitSound: userObj.volumeHitSound,
            scrollSpeed: userObj.scrollSpeed,
            keys1: userObj.keys1,
          },
        },
      },
    });
  } catch (e) {
    console.error(e.message);
  } finally {
    prisma.$disconnect;
  }
}

async function updateUsername(id: string, newUsername: string) {
  try {
    try {
      await prisma.user.findUniqueOrThrow({
        where: {
          username: newUsername,
        },
      });

      return "Error: Username already exists in database";
    } catch (e) {
      if (e.name === "NotFoundError") {
        await prisma.user.update({
          where: {
            userId: id,
          },
          data: {
            username: newUsername,
          },
        });
      }
    }
  } catch (e) {
    console.error(e.message);
  } finally {
    prisma.$disconnect;
  }
}

async function submitScore(
  id: string,
  entry: {
    beatmapSetId: number;
    beatmapId: number;
    score: number;
    accuracy: number;
    maxCombo: number;
    grade: string;
  }
) {
  try {
    const idObj = {
      userId: id,
      beatmapSetId: entry.beatmapSetId,
      beatmapId: entry.beatmapId,
    };

    const bmRecord = await prisma.userPlayedBeatmap.findUnique({
      where: {
        userId_beatmapSetId_beatmapId: idObj,
      },
    });

    if (bmRecord) {
      await prisma.userPlayedBeatmap.update({
        where: {
          userId_beatmapSetId_beatmapId: idObj,
        },
        data: {
          highestScore:
            entry.score > bmRecord.highestScore ? entry.score : undefined,
          highestAccuracy:
            entry.accuracy > bmRecord.highestAccuracy
              ? entry.accuracy
              : undefined,
          highestMaxCombo:
            entry.maxCombo > bmRecord.highestMaxCombo
              ? entry.maxCombo
              : undefined,
          highestGrade:
            entry.accuracy > bmRecord.highestAccuracy ? entry.grade : undefined,

          playCount: {
            increment: 1,
          },

          entries: {
            create: {
              score: entry.score,
              accuracy: entry.accuracy,
              maxCombo: entry.maxCombo,
              grade: entry.grade,
            },
          },
        },
      });

      const numEntries = await prisma.userScoreEntry.count({
        where: idObj,
      });

      if (numEntries > 10) {
        const lowScoreEntries = await prisma.userScoreEntry.findMany({
          where: idObj,
          orderBy: [
            {
              score: "asc",
            },
            {
              accuracy: "asc",
            },
            {
              maxCombo: "asc",
            },
          ],
          take: numEntries - 10,
          select: {
            id: true,
          },
        });

        const entryIds = lowScoreEntries.map((obj) => {
          return obj.id;
        });

        await prisma.userScoreEntry.deleteMany({
          where: {
            id: {
              in: entryIds,
            },
          },
        });
      }
    } else {
      await prisma.userPlayedBeatmap.create({
        data: {
          userId: id,
          beatmapSetId: entry.beatmapSetId,
          beatmapId: entry.beatmapId,

          highestScore: entry.score,
          highestAccuracy: entry.accuracy,
          highestMaxCombo: entry.maxCombo,
          highestGrade: entry.grade,

          playCount: 1,

          entries: {
            create: {
              score: entry.score,
              accuracy: entry.accuracy,
              maxCombo: entry.maxCombo,
              grade: entry.grade,
            },
          },
        },
      });

      await prisma.userStats.update({
        where: {
          userId: id,
        },
        data: {
          playCountUnique: {
            increment: 1,
          },
        },
      });
    }

    const agg = await prisma.userPlayedBeatmap.aggregate({
      where: {
        userId: id,
      },
      _avg: {
        highestScore: true,
        highestAccuracy: true,
      },
      _max: {
        highestMaxCombo: true,
      },
      _sum: {
        playCount: true,
      },
    });

    const aggGrade = await prisma.userPlayedBeatmap.groupBy({
      where: {
        userId: id,
      },
      by: ["highestGrade"],
      _count: {
        _all: true,
      },
    });

    const reformatAggGrade: {
      [key: string]: number;
    } = {};

    aggGrade.forEach((obj) => {
      reformatAggGrade[obj.highestGrade] = obj._count._all;
    });

    await prisma.userStats.update({
      where: {
        userId: id,
      },
      data: {
        averageScore: agg._avg.highestScore
          ? Math.round(agg._avg.highestScore)
          : undefined,
        averageAccuracy: agg._avg.highestAccuracy
          ? Math.round(agg._avg.highestAccuracy)
          : undefined,
        highestMaxCombo: agg._max.highestMaxCombo
          ? agg._max.highestMaxCombo
          : undefined,
        playCountUnique: agg._sum.playCount ? agg._sum.playCount : undefined,

        SS: reformatAggGrade.SS ? reformatAggGrade.SS : undefined,
        S: reformatAggGrade.S ? reformatAggGrade.S : undefined,
        A: reformatAggGrade.A ? reformatAggGrade.A : undefined,
        B: reformatAggGrade.B ? reformatAggGrade.B : undefined,
        C: reformatAggGrade.C ? reformatAggGrade.C : undefined,
        D: reformatAggGrade.D ? reformatAggGrade.D : undefined,
      },
    });
  } catch (e) {
    console.error(e.message);
  } finally {
    prisma.$disconnect;
  }
}

async function getUserSongScores(
  id: string,
  idObj: {
    beatmapSetId: number;
    beatmapId: number;
  }
) {
  return await prisma.userScoreEntry.findMany({
    where: {
      userId: id,
      beatmapSetId: idObj.beatmapSetId,
      beatmapId: idObj.beatmapId,
    },
  });
}

async function getGlobalLeaderboard() {
  try {
    const leaderboard = await prisma.userStats.findMany({
      where: {
        playCountUnique: {
          gte: 3,
        },
      },
      orderBy: [
        { averageScore: "desc" },
        { averageAccuracy: "desc" },
        { highestMaxCombo: "desc" },
      ],
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    fs.writeFileSync(
      "logs/leaderboard/global.json",
      JSON.stringify(leaderboard)
    );
    return leaderboard;
  } catch (e) {
    console.error(e.message);
  } finally {
    prisma.$disconnect;
  }
}

async function getSongLeaderboard(beatmapSetId: number, beatmapId: number) {
  try {
    const leaderboard = await prisma.userPlayedBeatmap.findMany({
      where: {
        beatmapSetId: beatmapSetId,
        beatmapId: beatmapId,
      },
      orderBy: [
        { highestScore: "desc" },
        { highestAccuracy: "desc" },
        { highestMaxCombo: "desc" },
      ],
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    fs.writeFileSync("logs/leaderboard/song.json", JSON.stringify(leaderboard));
    return leaderboard;
  } catch (e) {
    console.error(e.message);
  } finally {
    prisma.$disconnect;
  }
}

async function main() {
  /*   await submitScore("3", {
    beatmapSetId: 3,
    beatmapId: 3,
    accuracy: 1,
    grade: "A",
    maxCombo: 200,
    score: 10000,
  }); */
  await getSongLeaderboard(1, 1);
  await log();
}

main();
