import instance from "@/shared/model/api/axios-instance";
import { TDtoFight } from "@/shared/model/types/fight";
import { TDtoFighter } from "@/shared/model/types/fighter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "@/shared/hooks/use-toast";

const urlImg =
  "https://images.unsplash.com/photo-1610543123792-135b26601797?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function FightAdminVotePage() {
  const { fightId } = useParams();

  const { data: fight } = useQuery({
    queryKey: ["fight", fightId],
    queryFn: async ({ queryKey }): Promise<TDtoFight> => {
      const [_, id] = queryKey;
      const response = await instance.get(`/fights/${id}`);
      console.log("fight -", fight);
      return response.data;
    },
  });

  const votedMutation = useMutation({
    mutationFn: async ({
      vote,
      id,
    }: {
      vote: "leftCorner" | "rightCorner";
      id: string;
    }) => {
      const response = await instance.patch(`/fights/${id}`, { voteFor: vote });
      return response.data;
    },
    onSuccess: () => {
      toast({ title: "Голосование прошло успешно" });
    },
    onError: (error) => {
      toast({ title: error.response.data.message });
    },
  });

  const handleMutateVote = ({
    vote,
    id,
  }: {
    vote: "leftCorner" | "rightCorner";
    id: string;
  }) => {
    votedMutation.mutate({ vote, id });
  };
  return (
    <div className="py-12 px-40 flex flex-col gap-10 w-full">
      <span className="font-bold text-[45px]">Голосовать за бойца</span>
      <div className="flex px-40 justify-between items-center w-full">
        {fight && (
          <div className="flex flex-col gap-2">
            <span className="flex gap-2 text-[20px] font-medium">
              <span>Голосов:</span> {fight?.vote?.leftCorner}
            </span>
            <FighterCard
              fighter={fight?.fighters?.leftCornerFighterId}
              vote="leftCorner"
              handleMutateVote={handleMutateVote}
              id={fightId}
            />
          </div>
        )}
        <img src="/vs.png" className="w-[410px] h-[325px]" />
        {fight && (
          <div className="flex flex-col gap-2">
            <span className="flex gap-2 text-[20px] font-medium">
              <span>Голосов:</span> {fight?.vote?.rightCorner}
            </span>
            <FighterCard
              fighter={fight?.fighters?.rightCornerFighterId}
              vote="rightCorner"
              handleMutateVote={handleMutateVote}
              id={fightId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function FighterCard({
  fighter,
  vote,
  handleMutateVote,
  id,
}: {
  fighter: TDtoFighter;
  vote: "leftCorner" | "rightCorner";
  handleMutateVote: ({
    vote,
    id,
  }: {
    vote: "leftCorner" | "rightCorner";
    id: string;
  }) => void;
  id: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-12 w-fit">
      <div className="w-[300px] h-[365px]">
        <img
          className="object-cover w-full h-full"
          src={fighter?.photo || urlImg}
        />
      </div>

      <div className="flex flex-col gap-0">
        <span className="text-3xl font-bold">{fighter?.name}</span>
        <span className="text-xl font-normal text-red-500 mt-6">Боец UFC</span>
        <span className="text-xl font-normal"> {fighter?.dignity}</span>

        <span className="text-xl font-normal">{fighter?.weightCategory}</span>

        <span className="text-xl font-normal">{fighter?.weightCategory}</span>
      </div>

      <div className="w-full flex justify-center">
        {id && (
          <button
            onClick={() => handleMutateVote({ vote, id })}
            className="bg-red-500 text-white py-3 rounded-xl w-fit px-10"
          >
            Голосовать
          </button>
        )}
      </div>
    </div>
  );
}
