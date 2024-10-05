#!/usr/bin/env ruby
# frozen_string_literal: true

require './men_services_pb'

class ServerImpl < Men::MenService::Service
  def get_men(_req, _call)
    men_map = {
      'mita'    =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '超デロ'        }),
      'meguro'  =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: 'デロ'  }),
      'sengawa' =>      Men::GetMenResponse.new(men:    {       futosa: '太',   katasa: '微硬'  }),
      'kabukicho'       =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: '微デロ'        }),
      'shinagawa'       =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: '微硬'  }),
      'otakibashidori'  =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: 'デロ'  }),
      'shindaita'       =>      Men::GetMenResponse.new(men:    {       futosa: '極太', katasa: '超硬'  }),
      'yaenkaido'       =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '硬'    }),
      'ikebukuro'       =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '微硬'  }),
      'kameido' =>      Men::GetMenResponse.new(men:    {       futosa: '極細', katasa: '微デロ'        }),
      'keikyukawasaki'  =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: 'デロ'  }),
      'fuchu'   =>      Men::GetMenResponse.new(men:    {       futosa: '極太', katasa: '硬'    }),
      'matsudo' =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '微デロ'        }),
      'mejirodai'       =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: '微デロ'        }),
      'ogikubo' =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: '中'    }),
      'kaminoge'        =>      Men::GetMenResponse.new(men:    {       futosa: '極細', katasa: '中'    }),
      'keiseiokubo'     =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: '超デロ'        }),
      'ichinoe' =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: 'デロ'  }),
      'sagamiono'       =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: '微硬'  }),
      'kannai'  =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: '微デロ'        }),
      'jimbocho'        =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: '微デロ'        }),
      'koiwa'   =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: '中'    }),
      'hibarigaoka'     =>      Men::GetMenResponse.new(men:    {       futosa: '極細', katasa: '中'    }),
      'sakuradai'       =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: 'デロ'  }),
      'tochigikaido'    =>      Men::GetMenResponse.new(men:    {       futosa: '極細', katasa: 'デロ'  }),
      'tachikawa'       =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: '微デロ'        }),
      'senjuohashi'     =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: '超デロ'        }),
      'shonanfujisawa'  =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: '微デロ'        }),
      'nishidai'        =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: 'デロ'  }),
      'nakayama'        =>      Men::GetMenResponse.new(men:    {       futosa: '細',   katasa: 'デロ'  }),
      'sendai'  =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: '微デロ'        }),
      'sapporo' =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '硬'    }),
      'aizuwakamatsu'   =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: '微硬'  }),
      'niigata' =>      Men::GetMenResponse.new(men:    {       futosa: '太',   katasa: '硬'    }),
      'kawagoe' =>      Men::GetMenResponse.new(men:    {       futosa: '微細', katasa: '微硬'  }),
      'kyoto'   =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '微硬'  }),
      'koshigaya'       =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '硬'    }),
      'maebashi'        =>      Men::GetMenResponse.new(men:    {       futosa: '中',   katasa: '中'    }),
      'chiba'   =>      Men::GetMenResponse.new(men:    {       futosa: '太',   katasa: '硬'    }),
      'omiyakoen'       =>      Men::GetMenResponse.new(men:    {       futosa: '微太', katasa: '微デロ'        })
    }
    men_map[_req.tenpo]
  end
end

server = GRPC::RpcServer.new
server.add_http2_port('0.0.0.0:50056', :this_port_is_insecure)
puts 'start server on Men port 50056'
server.handle(ServerImpl.new)
server.run_till_terminated_or_interrupted([1, 'int', 'SIGQUIT'])
